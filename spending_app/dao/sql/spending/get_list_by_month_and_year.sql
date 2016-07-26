select
    id,
    user_id,
    date,
    sum,
    text,
    category
    from spending
    where user_id = :user_id
        and abs(strftime('%Y', date)) = :year
        and abs(strftime('%m', date)) = :month
    order by strftime('%d', date), id;
