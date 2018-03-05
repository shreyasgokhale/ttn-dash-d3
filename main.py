import os, glob, sched, time, sys
import json
import datetime
import time
import ttn
import dateutil.parser

app_id = "your-app-id"
access_key = "your-access-key"
data=[]

# Convert receieved timestamp into json readable format
def jsondateconv(o):
    day =  dateutil.parser.parse(str(o))
    return  day.strftime("%Y-%m-%d %X")

# Save data to data/result.json
def add(args):
    with open("data/result.json", mode='r', encoding='utf-8') as feedsjson:
        feeds = json.load(feedsjson)
    with open("data/result.json", mode='w', encoding='utf-8') as feedsjson:
        feeds.append(args)
        json.dump(feeds, feedsjson)

def savems(msg):
    add({ "time": jsondateconv(str(msg.metadata.time)), "temperature": msg.payload_fields.temperature, "light": msg.payload_fields.light })    

with open("data/result.json", mode='w', encoding='utf-8') as f:
    json.dump([], f)

# Callback function when client receievs msg 
def uplink_callback(msg, client):
  try :
    savems(msg)
  except AttributeError :
    print("Some atrribute missing")


# TTN Handler
handler = ttn.HandlerClient(app_id, access_key)

# MQTT client
mqtt_client = handler.data()
mqtt_client.set_uplink_callback(uplink_callback)

# Refresh data every minute
while True :
    mqtt_client.connect()
    time.sleep(60)
    mqtt_client.close()
