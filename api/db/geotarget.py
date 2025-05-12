import os
import psycopg

def get_openvpn_config(id):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT openvpn_config FROM geotargets WHERE id = %s", (id,))
            result = cursor.fetchone()
            if result:
                return result[0]
            return None

def get_geotarget(id):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor(row_factory=psycopg.rows.dict_row) as cursor:
            cursor.execute("SELECT * FROM geotargets WHERE id = %s", (id,))
            result = cursor.fetchone()
            return result

'''
CREATE TABLE geotargets (
    id SERIAL PRIMARY KEY,
    criteria_id TEXT NOT NULL,
	canonical_name TEXT NOT NULL,
	location_name TEXT NOT NULL,
    uule TEXT NOT NULL,
    openvpn_config TEXT NOT NULL
)
ALTER TABLE geotargets ADD COLUMN location_type TEXT;
'''