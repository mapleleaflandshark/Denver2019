alter proc k2_UpdateWebMemberType(@triggerid varchar(10))
as
begin

	insert into Name_Log (DATE_TIME,LOG_TYPE,SUB_TYPE,USER_ID,ID,LOG_TEXT)
	select	getDate(),
		'CHANGE',
		'CHANGE',
		UPDATED_BY,
		ID,
		'Name.MIDDLE_NAME: ' + MIDDLE_NAME + ' -> '
	from	Name
	where	ID = @triggerid
	and	MEMBER_TYPE = 'NM'
	and	MIDDLE_NAME = 'PROS'

	insert into Name_Log (DATE_TIME,LOG_TYPE,SUB_TYPE,USER_ID,ID,LOG_TEXT)
	select	getDate(),
		'CHANGE',
		'CHANGE',
		UPDATED_BY,
		ID,
		'Name.MEMBER_TYPE: ' + MEMBER_TYPE + ' -> ' + MIDDLE_NAME
	from	Name
	where	ID = @triggerid
	and	MEMBER_TYPE = 'NM'
	and	MIDDLE_NAME = 'PROS'

	update	Name
	set	MEMBER_TYPE = MIDDLE_NAME,
		MIDDLE_NAME = '',
		FULL_NAME = FIRST_NAME + ' ' + LAST_NAME,
		LAST_UPDATED = getDate()
	where	ID = @triggerid
	and	MEMBER_TYPE = 'NM'
	and	MIDDLE_NAME = 'PROS'

end
