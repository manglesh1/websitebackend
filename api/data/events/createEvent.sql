INSERT INTO [dbo].[Enquiry]
    (
        [FirstName],
        [LastName],
        [Email],
        [Phone],
        [Created],
         [EventDate]
    )
VALUES 
    (
        @FirstName,
        @LastName,
        @Email,
        @Phone,
        @Created,
        @EventDate
    )

