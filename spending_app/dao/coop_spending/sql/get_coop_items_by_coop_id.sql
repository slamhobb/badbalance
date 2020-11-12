select
	csi.id,
	csi.coop_spending_id,
	csi.date,
	csi.data
	from coop_spending_item as csi
		join coop_spending_user as csu on
			csi.coop_spending_id = csu.coop_spending_id
	where csi.coop_spending_id = :coop_spending_id
		and csu.user_id = :user_id;
