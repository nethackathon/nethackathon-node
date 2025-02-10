-- Rename the existing table
RENAME TABLE event_streamer TO event_schedule;

-- Create new event_streamer table
CREATE TABLE event_streamer (
    event_id BIGINT UNSIGNED NOT NULL,
    streamer_id BIGINT UNSIGNED NOT NULL,
    survey TEXT,
    checklist TEXT,
    signed_up BOOLEAN DEFAULT false,
    schedule VARCHAR(4096) DEFAULT '{}',
    PRIMARY KEY (event_id, streamer_id),
    UNIQUE KEY unique_event_streamer (event_id, streamer_id),
    FOREIGN KEY (event_id) REFERENCES event(id),
    FOREIGN KEY (streamer_id) REFERENCES streamer(id)
);

-- Copy unique pairs and set signed_up to true
INSERT INTO event_streamer (event_id, streamer_id, survey, signed_up)
SELECT DISTINCT 
    event_id,
    streamer_id,
    MAX(survey),
    true
FROM event_schedule
GROUP BY event_id, streamer_id;

-- Remove column from event_schedule
ALTER TABLE event_schedule 
    DROP COLUMN survey;