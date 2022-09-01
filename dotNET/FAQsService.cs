using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
    public class FAQsService : IFAQsService
    {
        IDataProvider _data = null;
        public FAQsService(IDataProvider data)
        {
            _data = data;
        }

        public int AddFAQ(FAQAddRequest requestModel)
        {
            int Id = 0;
            string procName = "[dbo].[FAQs_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(requestModel, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out Id);
            });

            return Id;
        }

        public List<FAQ> GetAllFAQs()
        {
            List<FAQ> list = null;
            string procName = "[dbo].[FAQs_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FAQ aFAQ = MapFAQ(reader);

                if (list == null)
                {
                    list = new List<FAQ>();
                };

                list.Add(aFAQ);
            });
            return list;
        }

        public FAQ SelectByCategoryId(int id)
        {
            string procName = "[dbo].[FAQs_Select_ByCategoryId]";
            FAQ faq = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@FAQCategoriesId", id);

            }, delegate (IDataReader reader, short set)
            {

                faq = MapFAQ(reader);
            });

            return faq;
        }

        public void Update(FAQUpdateRequest model)
        {
            string procName = "[dbo].[FAQs_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
            returnParameters: null);
        }

        public void DeleteById(int Id)
        {
            string procName = "[dbo].[FAQs_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                },
                returnParameters: null);
        }

        private static void AddCommonParams(FAQAddRequest requestModel, SqlParameterCollection col)
        {
            col.AddWithValue("@Question", requestModel.Question);
            col.AddWithValue("@Answer", requestModel.Answer);
            col.AddWithValue("@CategoryId", requestModel.CategoryId);

        }

        private static FAQ MapFAQ(IDataReader reader)
        {
            FAQ faq = new FAQ();
            int startingIndex = 0;

            faq.Id = reader.GetSafeInt32(startingIndex++);
            faq.Question = reader.GetSafeString(startingIndex++);
            faq.Answer = reader.GetSafeString(startingIndex++);
            faq.CategoryId = reader.GetSafeInt32(startingIndex++);
            faq.CategoryName = reader.GetSafeString(startingIndex++);
            faq.SortOrder = reader.GetSafeInt32(startingIndex++);

            return faq;

        }

    }
}
