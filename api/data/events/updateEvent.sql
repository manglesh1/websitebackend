
UPDATE [dbo].[customers]
SET [BulkEmail]=@BulkEmail,
[LastUpdate]= @LastUpdate
WHERE [EMailAddress]=@email


