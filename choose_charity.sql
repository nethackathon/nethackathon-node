set @rownum=0; select (@rownum := @rownum+1) as num,
    JSON_EXTRACT(checklist, '$.suggestedCharity') as charity
    from streamer
    where id in (
        select streamer_id from event_streamer where event_id = 6
    ) having charity is not null;
