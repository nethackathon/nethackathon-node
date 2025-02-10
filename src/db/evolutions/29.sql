ALTER TABLE event_streamer ADD COLUMN signed_up BOOLEAN DEFAULT false;
ALTER TABLE event_streamer ADD COLUMN schedule VARCHAR(4096) DEFAULT '{}';