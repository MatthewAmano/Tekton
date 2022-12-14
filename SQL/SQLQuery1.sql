USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Select_ByCategoryId]    Script Date: 8/31/2022 7:39:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Matthew Amano
-- Create date: 7/28/22
-- Description: FAQs Selecting By CategoryId Proc (No pagination) 
-- Code Reviewer:

-- MODIFIED BY: Joshua Flores
-- MODIFIED DATE: 8/2/2022
-- Code Reviewer: Joshua Flores
-- Note:
-- =============================================


ALTER   PROC [dbo].[FAQs_Select_ByCategoryId]
			@FAQCategoriesId int

AS 

/*---Test Code---
		Declare @FAQCategoriesId int = 6;

		Execute [dbo].[FAQs_Select_ByCategoryId]
				@FAQCategoriesId

		Select *
		From [dbo].[FAQs]
		Where Id = @FAQCategoriesId
		
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
		
		
FROM dbo.FAQS as f INNER JOIN dbo.FAQCategories as fc 
	ON f.CategoryId = fc.Id
	

	WHERE fc.Id = @FAQCategoriesId
	ORDER BY [Id]

END