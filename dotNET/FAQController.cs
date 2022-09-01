using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;



namespace Sabio.Web.Api.Controllers
{
    [Route("api/faqs")]
    [ApiController]
    public class FAQApiController : BaseApiController
    {
        private IFAQsService _service = null;
        public FAQApiController(IFAQsService service, ILogger<FAQApiController> logger) : base(logger)
        {
            _service = service;
        }


        [HttpPost("")]
        public ActionResult<ItemResponse<int>> AddFAQ(FAQAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.AddFAQ(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                response.Item = id;

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }


        [HttpGet("")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<FAQ>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<FAQ> list = _service.GetAllFAQs();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<FAQ> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }


        [HttpGet("{id:int}")]
        [AllowAnonymous]

        public ActionResult<ItemResponse<FAQ>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                FAQ faq = _service.SelectByCategoryId(id);

                if (faq == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<FAQ> { Item = faq };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }



        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(FAQUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteById(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
