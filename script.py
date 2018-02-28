from flask import Flask, request, abort
import os, glob, sched, time, sys
import json
from pymongo import MongoClient
import datetime
import time
import ttn
import pandas as pd
import numpy as np
import paho.mqtt.client as mqtt
import dateutil.parser

app_id = "johan-dev"
access_key = "ttn-account-v2.ey5eQ4cqS4dCVSMsELtz4G3r8k1t52phkxXy3ATzPwk"
data=[]


def jsondateconv(o):
    day =  dateutil.parser.parse(str(o))
    return  day.strftime("%Y-%m-%d %X")


def add(args):
    with open("data/result.json", mode='r', encoding='utf-8') as feedsjson:
        feeds = json.load(feedsjson)
    with open("data/result.json", mode='w', encoding='utf-8') as feedsjson:
        feeds.append(args)
        json.dump(feeds, feedsjson)

def writejson(body):
    f = open("data/result.json", "r+")
    data=f.read()
    if not data:
        f.write(body)
    else :
        jsondata = json.loads(data)
        jsondata = jsondata + ","+ "/n" + body
        f.write(jsondata)


def savems(msg):
    add({ "time": jsondateconv(str(msg.metadata.time)), "temperature": msg.payload_fields.temperature, "light": msg.payload_fields.light })    
 
with open("data/result.json", mode='w', encoding='utf-8') as f:
    json.dump([], f)

def uplink_callback(msg, client):
  try :
    savems(msg)
  except AttributeError :
    print("Some atrribute missing")



handler = ttn.HandlerClient(app_id, access_key)

# using mqtt client
mqtt_client = handler.data()
mqtt_client.set_uplink_callback(uplink_callback)
while True :
    mqtt_client.connect()
    time.sleep(60)
    mqtt_client.close()
