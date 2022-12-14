USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectAll]    Script Date: 8/31/2022 7:57:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Matthew Amano
-- Create date: 7/28/22
-- Description: FAQs Select All Proc (No pagination)
-- Code Reviewer: Joshua Flores

-- MODIFIED BY: Joshua Flores
-- MODIFIED DATE: 8/2/2022
-- Code Reviewer: Joshua Flores
-- Note:
-- =============================================


ALTER   PROC [dbo].[FAQs_SelectAll]

AS

/*----------------------Test Code-------------------------------


EXECUTE [dbo].[FAQs_SelectAll] 

SELECT *
FROM [dbo].[FAQs]

*/


BEGIN 
	
	SELECT f.Id
		,f.Question
		,f.Answer
		,f.CategoryId
		,fc.Name as CategoryName
		,f.SortOrder
		,f.DateCreated
		,f.DateModified
		,f.CreatedBy
		,f.ModifiedBy


FROM dbo.FAQs as f INNER JOIN dbo.FAQCategories as fc 
	ON f.CategoryId = fc.Id 




END 