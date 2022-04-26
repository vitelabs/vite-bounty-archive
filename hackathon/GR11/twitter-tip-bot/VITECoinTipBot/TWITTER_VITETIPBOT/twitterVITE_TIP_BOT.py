
import os
import bson
from bson.objectid import ObjectId
import json
from pymongo import MongoClient, errors
import time
from datetime import date, timedelta, datetime
from decimal import *
from flask import Flask, session, render_template, request, redirect, url_for, jsonify, escape
from werkzeug.exceptions import HTTPException
import sys
import jinja2
#import numpy as np 
import pprint
import socket 
#import pyodbc  
import pprint
import random
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pathlib import Path
import urllib3
import certifi

import tweepy
import random 
from random import randint

import matplotlib.pyplot as plt
import matplotlib.image as mpimg 

import pytz
from datetime import datetime, timezone

import msgs_lib_vite
from msgs_lib_vite import *

local_template_folder = str(Path(__file__).parent.absolute()) + str('/Templates')
local_imgs_folder = str(Path(__file__).parent.absolute()) + str('/viteimgs')


http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())

import VITE_WALLET_LEDGER
from VITE_WALLET_LEDGER import *


import datetime 
from datetime import datetime, time

now = datetime.now()
ts = datetime.timestamp(now)
str(datetime.timestamp(now)).replace('.', '', 900).replace('.', '', 900)


CONSUMER_KEY=''
CONSUMER_SECRET=''
ACCESS_TOKEN = ''
ACCESS_TOKEN_SECRET=''
BEARER_TOKEN=''


# Authenticate to Twitter
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

# Create API object
#api = tweepy.API(auth)

# Create API object
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)



def retornaIDdoUSUario(_username):
    try:
        print('')
        #data = '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x355b75"],"id":1}' 
        r = http.request('GET', 'https://api.twitter.com/2/users/by/username/'+_username, headers={'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAAUISQEAAAAAUr5L9Wpf7LOMDYqgzE3HGHaQnkc%3DcaHYcqMRtiNvLGU3sLdQkLT5S9rvSXptS2EUM9bSMFi4C2RoAD'}) # , body=data
        recebido = json.loads(r.data.decode('utf-8'))
        #print('recebido >>>>: ', int(recebido['result'], 16))
        print('recebido::: ', recebido['data']['id'])
        #return str(int(recebido['result'], 16))
        return str(recebido['data']['id'])

    except Exception as err:
        pass
        print('erro em retornaIDdoUSUario : ', err)
        return str("")



def sendTWEET():    
    # Create a tweet
    api.update_status("Have a good day my friends #Bitcoin")



def authorAndTweetsOnMyPage():
    timeline = api.home_timeline()
    for tweet in timeline:
        print(f"{tweet.user.name} said {tweet.text}")

#authorAndTweetsOnMyPage()




def infoAboutUserAndHisFollowers(_user): # "vitecointipbot"
    user = api.get_user(str(_user))

    print("User details:")
    print(user.name)
    print(user.description)
    print(user.location)
    print(user.id)
    print('------')
    
    print("Last 20 Followers:")
    for follower in user.followers():
        print(follower.name)
        print(follower.id)
        print(follower.location)
        print('--->>> follower object: ')
        print(follower)
        # destroy friendship
        # api.destroy_friendship(follower.id)
    
    print("Last 20 Followers destroyed")



#infoAboutUserAndHisFollowers()


def infoAboutUserAndHisFollowers_register_and_welcome_msg(_user): # "vitecointipbot"
    user = api.get_user(str(_user))

    print("User details:")
    print(user.name)
    print(user.description)
    print(user.location)
    print(user.id)
    print('------')
    time.sleep(50)
    print('=-=--=-=-=-')
    
    print("Last 20 Followers:")
    for follower in user.followers():
        print(follower.name)
        print(follower.id)
        print(follower.location)
        print('--->>> follower object: ')
        print(follower)
        
        # check if exists on JSONDB


    
    print("Last 20 Followers ")



#infoAboutUserAndHisFollowers_register_and_welcome_msg("vitecointipbot") # "vitecointipbot"


def destroyMyTweets():
    print('')
    for status in tweepy.Cursor(api.user_timeline).items():
        print('')
        print(status.id)
        #delete tweet:
        api.destroy_status(status.id)
    print('todos os tweets deletados com sucesso.')    



#destroyMyTweets()


def followUser(_user):
    api.create_friendship(str(_user)) # "realpython"


def likeTweetOnMyPage():
    tweets = api.home_timeline(count=1)
    tweet = tweets[0]
    print(f"Liking tweet {tweet.id} of {tweet.author.name}")
    api.create_favorite(tweet.id)


msg_VITE_DEFI = ["#VITECoin will lead DeFi o/ #ViteCoin #vitetipbot #ViteX", "#VITECoin and Defi will led the future. #ViteCoin #vitetipbot #ViteX", "#VITECoin and DeFi will change the world! o/ #ViteCoin #vitetipbot #ViteX"]
msg_VITE_BTC = ["#BTC and #VITECoin to DeFi and beyondo/ #ViteCoin #vitetipbot #ViteX", "#BTC and Defi will make you shake ;). #ViteCoin #vitetipbot #ViteX", "#BTC and #VITECoin #VITECoin will change the world! o/ #ViteCoin #vitetipbot #ViteX"]
msg_VITE_DEFI_FR = ["#VITECoin avec DeFi o/ #ViteCoin #vitetipbot #ViteX", "#VITECoin et Defi tres bien #ViteCoin #vitetipbot #ViteX", "#VITECoin et DeFi allez changer nouz future! o/ #ViteCoin #vitetipbot #ViteX"]
msg_VITE_BTC_FR = ["#BTC et #VITECoin trouve le DeFi :D o/ #ViteCoin #vitetipbot #ViteX", "#BTC et Defi will allez chantee une bonne musique;). #ViteCoin #vitetipbot #ViteX", "#BTC et #VITECoin #VITECoin merci merci! o/ #ViteCoin #vitetipbot #ViteX"]
exchanges_list = ["#Binance", "#OKex", "#ZT", "#Huobi"]
msg_VITE_PROMO_USA = ["Buy on  " + str(exchanges_list[randint(0, len(exchanges_list)-1)]) ,"Like Pin and Share #ViteCoin #vitetipbot #ViteX","Pls visit our Website #vite.org #ViteCoin #vitetipbot #ViteX"]
msg_VITE_PROMO_FRANCE = ["Acheter  " + str(exchanges_list[randint(0, len(exchanges_list)-1)]) + str(" #VITECoin #ViteCoin #vitetipbot #ViteX")  ,"Suivre mon chaine #vite.org","Pls visit our Website #VITECoin #ViteCoin #vitetipbot #ViteX"]

general_terms_PEOPLE_TALKING_ABOUT = [] # run time filling. fr and en



def periodOfTheDay_EUROPE():
    #utc_dt = datetime.now(timezone.utc)
    #dt = utc_dt.astimezone()
    #tz = pytz.timezone('Europe/Berlin')
    tz = pytz.timezone('Europe/Paris')
    europe_now = datetime.now(tz)
    europe_now_hour = datetime.now(tz).hour
    #print(europe_now)
    #print(europe_now_hour)
    if ((europe_now_hour >= 4) and (europe_now_hour <= 10)):
        print('Bonjour Paris')
        # meme de la matin, morning meme
    if ((europe_now_hour >15) and (europe_now_hour <= 18)):
        print("bonn'apres midi Paris")
        # apres midi meme # afternoon meme
    if ((europe_now_hour >18) and (europe_now_hour <= 23)):
        print('Bon nuit Paris')
        # niut meme # night meme
    return europe_now_hour


def periodOfTheDay_USA():
    #utc_dt = datetime.now(timezone.utc)
    #dt = utc_dt.astimezone()
    #tz = pytz.timezone('Europe/Berlin')
    tz = pytz.timezone('US/Eastern')
    europe_now = datetime.now(tz)
    europe_now_hour = datetime.now(tz).hour
    #print(europe_now)
    print(europe_now_hour)
    if ((europe_now_hour >= 4) and (europe_now_hour <= 10)):
        print('Good morning  periodOfTheDay_USA()')
        # meme de la matin, morning meme
    if ((europe_now_hour >=13) and (europe_now_hour <= 18)):
        print("good noon  periodOfTheDay_USA()")
        # apres midi meme # afternoon meme
    if ((europe_now_hour >18) and (europe_now_hour <= 23)):
        print('Good evenning periodOfTheDay_USA()')
        # niut meme # night meme
    
    return europe_now_hour





def searchTweets_EN(_term):
    general_terms_PEOPLE_TALKING_ABOUT.clear()

    for tweet in api.search(q=str(_term), lang="en", rpp=10):
        #print('tweet:::::')
        #print(tweet)
        top_msg_1 = ""
        top_msg_2 = ""
        print('')
        print(f"{tweet.user.name}:{tweet.text}")
        if "Bitcoin" in tweet.text: # 2nd Level TOP TERM to improve accuracy
            print('======>>>>>> OK DAO FOUND on TEXT MESSAGE USA')

            if "DeFi" in tweet.text:
                print('======>>>>>> OK #VITECoin and DeFi FOUND on TEXT MESSAGE USA')


                top_msg_1 = msg_VITE_DEFI[randint(0, len(msg_VITE_DEFI)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_1))

            if "#Bitcoin" in tweet.text:
                print('======>>>>>> OK DAO FOUND on TEXT MESSAGE USA')
                top_msg_2 = msg_VITE_BTC[randint(0, len(msg_VITE_BTC)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

            

        #user1 = str(tweet.user.name)
        #print('====>>>>>name '+str(user1))
        #print('====>>>>>id '+str(tweet.user.id))
        followUser(str(tweet.user.id))
        #print('===========')
        time.sleep(3)



def searchTweets_FR(_mot):
    general_terms_PEOPLE_TALKING_ABOUT.clear()
    for tweet in api.search(q=str(_mot), lang="fr", rpp=10):
        #print('tweet:::::')
        #print(tweet)
        print('')
        print(f"{tweet.user.name}:{tweet.text}")
        if "Bitcoin" in tweet.text: # 2nd Level TOP TERM to improve accuracy
            print('======>>>>>> OK DAO FOUND on TEXT MESSAGE france')

            if "DeFi" in tweet.text:
                print('======>>>>>> OK #VITECoin and DeFi FOUND on TEXT MESSAGE france')


                top_msg_1 = msg_VITE_DEFI_FR[randint(0, len(msg_VITE_DEFI_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_1))

            if "Bitcoin" in tweet.text:
                print('======>>>>>> OK Bitcoin FOUND on TEXT MESSAGE france')
                top_msg_2 = msg_VITE_BTC_FR[randint(0, len(msg_VITE_BTC_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

            if "bitcoin" in tweet.text:
                print('======>>>>>> OK Bitcoin FOUND on TEXT MESSAGE france')
                top_msg_2 = msg_VITE_BTC_FR[randint(0, len(msg_VITE_BTC_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

            if "BTC" in tweet.text:
                print('======>>>>>> OK BTC FOUND on TEXT MESSAGE france')
                top_msg_2 = msg_VITE_BTC_FR[randint(0, len(msg_VITE_BTC_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

            if "#BTC" in tweet.text:
                print('======>>>>>> OK BTC FOUND on TEXT MESSAGE france')
                top_msg_2 = msg_VITE_BTC_FR[randint(0, len(msg_VITE_BTC_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

            if "#Bitcoin" in tweet.text:
                print('======>>>>>> OK #Bitcoin FOUND on TEXT MESSAGE france')
                top_msg_2 = msg_VITE_BTC_FR[randint(0, len(msg_VITE_BTC_FR)-1)]
                general_terms_PEOPLE_TALKING_ABOUT.append(str(top_msg_2))

        #user1 = str(tweet.user.name)
        #print('====>>>>>name '+str(user1))
        #print('====>>>>>id '+str(tweet.user.id))
        followUser(str(tweet.user.id))
        #print('===========')
        time.sleep(3)






def trendingWorldWide():
    trends_result = api.trends_place(23424977)
    for trend in trends_result[0]["trends"]:
        print(trend)
        print(trend["name"])


# trendingWorldWide()



msgsLog = [{"en":0, "fr":0}]
msgOfTheDay = {"period":1, "language":1, "msgnumber":1, "msg":"Hello #Bitcoin #Traders"}
viteMeme = {"background":1, "face":1, "glass":1, "blunt":1, "cap":1}

gpsLocationsFrance = [{"city":"Dunkirk, Hauts-de-France", "lat":"51.050030", "lon":"2.397766"},
{"city":"Lille, Hauts-de-France", "lat":"50.629250", "lon":"3.057256"},
{"city":"Menton, the Provence-Alpes-Côte d'Azur", "lat":"43.774483", "lon":"7.497540"},
{"city":"Bastia, the Haute-Corse", "lat":"42.697285", "lon":"9.450881"},
{"city":"Le Cannet, Cannes", "lat":"43.552849", "lon":"7.017369"},
{"city":"Beauvais, the Hauts-de-France", "lat":"49.431744", "lon":"2.089773"},
{"city":"Mulhouse, Grand Est", "lat":"47.750839", "lon":"7.335888"},
{"city":"Bordeaux", "lat":"44.836151", "lon":"-0.580816"},
{"city":"Boulogne-Billancourt, Île-de-France", "lat":"48.843933", "lon":"2.247391"}]

gpsLocationsUsa = [{"city":"West Palm Beach, FL", "lat":"26.709723", "lon":"-80.064163"},
{"city":"Miami Gardens, FL", "lat":"25.942122", "lon":"-80.269920"},
{"city":"Murrieta, CA,", "lat":"33.569443", "lon":"-117.202499"},
{"city":"Springfield, IL", "lat":"39.799999", "lon":"-89.650002"},
{"city":"El Monte, CA", "lat":"34.073334", "lon":"-118.027496"},
{"city":"West Jordan, UT", "lat":"40.606388", "lon":"-111.976112"},
{"city":"College Station, TX", "lat":"30.601389", "lon":"-96.314445"},
{"city":"Fairfield, CA", "lat":"38.257778", "lon":"-122.054169"},
{"city":"Evansville, IN", "lat":"37.977222", "lon":"-87.550552"}]

msg_search_terms = ["Vite Coin", "ViteX Exchange", "Crypto", "Bitcoin", "Ethereum", "Cardano", "ViteX"]
#msg_exchange_terms = ["Binance", "Huobi Global Exchange", "OKEx Exchange", "FTX Exchange", "ZT Exchange"]
#people_termos = [{"term":"Crypto", "people:[]"}, {"term":"Vite", "people:[]"}]

# ===================================
# MSG USA
# ===================================

def textMessageToUSA(_hour):
    _res = 0
    if ((_hour >= 4) and (_hour <= 10)):
        _res = randint(1, 5)
        random_object_message = MSG_USA_MORNING[randint(0, len(MSG_USA_MORNING)-1)]['msg']
        return random_object_message

    if ((_hour >15) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        random_object_message = MSG_USA_AFTERNOON[randint(0, len(MSG_USA_AFTERNOON)-1)]['msg']
        return random_object_message

    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        random_object_message = MSG_USA_NIGHT[randint(0, len(MSG_USA_NIGHT)-1)]['msg']
        night_products = ["#Pizza", "#Burguer plus #fries", "#Soup"] # ["#Pizza", "#Macarons", "#Lait aux #chocolat chaud"]
        #night_places = ["@McDonalds", "@BurgerKing", "@Starbucks"] # ["@McDonaldsFrance", "@BurgerKingFR", "@StarbucksFrance"] 
        night_expressions = ["Where's the Moon right now?", "Under the moonlight ;)", "someone to share the #night ;)"]
        for _products in night_products:
            if _products in random_object_message:
                random_object_message.replace(_products, night_products[randint(0, len(night_products)-1)], 200)
        
        random_object_message += str(night_expressions[randint(0, len(night_expressions)-1)])

        return random_object_message


#txt1 =   textMessageToUSA(10) 
#print('selected message:', txt1)

# ===================================
# MSG FRANCE
# ===================================

def textMessageToFRANCE(_hour):
    _res = 0
    if ((_hour >= 4) and (_hour <= 10)):
        _res = randint(1, 5)
        random_object_message = MSG_FRANCE_MORNING[randint(0, len(MSG_FRANCE_MORNING)-1)]['msg']
        return random_object_message

    if ((_hour >15) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        random_object_message = MSG_FRANCE_APRES_MIDI[randint(0, len(MSG_FRANCE_APRES_MIDI)-1)]['msg']
        return random_object_message

    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        random_object_message = MSG_FRANCE_NUIT[randint(0, len(MSG_FRANCE_NUIT)-1)]['msg']
        night_products = ["#Pizza", "#Macarons", "#Lait aux #chocolat chaud"]
        night_places = ["@McDonaldsFrance", "@BurgerKingFR", "@StarbucksFrance"] 
        for _products in night_products:
            if _products in random_object_message:
                random_object_message.replace(_products, night_products[randint(0, len(night_products)-1)], 200)

        return random_object_message

# txt2 = extMessageToFRANCE(_hour)
#print('selected message:', txt2)

# ===================================
# MEME
# ===================================

def chooseBackground(_hour):
    if ((_hour >= 4) and (_hour <= 12)):
        _res = randint(1, 5)
        return _res
    if ((_hour >=13) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        return _res
    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        return _res

    return 1

def chooseFace(_hour):
    return 1 # only 1 available by now.
    if ((_hour >= 4) and (_hour <= 12)):
        _res = randint(1, 5)
        return _res
    if ((_hour >=13) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        return _res
    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        return _res

    return 1

def chooseGlass(_hour):
    if ((_hour >= 4) and (_hour <= 12)):
        _res = randint(1, 5)
        return _res
    if ((_hour >=13) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        return _res
    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        return _res

    return 1

def chooseCap(_hour):
    if ((_hour >= 4) and (_hour <= 12)):
        _res = randint(1, 5)
        return _res
    if ((_hour >=13) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        return _res
    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        return _res

    return 1

def chooseBlunt(_hour):
    if ((_hour >= 4) and (_hour <= 12)):
        _res = randint(1, 5)
        return _res
    if ((_hour >=13) and (_hour <= 18)):
        _res = randint(1, 5) # 6, 10
        return _res
    if ((_hour >18) and (_hour <= 23)):
        _res = randint(1, 5) # 11, 15
        return _res

    return 1



def tweetMEME(_filename, _status, _lat, _lon):
    # post the tweet
    api.update_with_media(_filename, _status, lat=_lat, lon=_lon)





def ViteMEME_IMAGE_PLOT(memeName, backgroundNumber, faceNumber, logoNumber, baloonNumber):    
    background = mpimg.imread(local_imgs_folder+'/backgnd/background'+str(backgroundNumber)+str('.png'))
    face = mpimg.imread(local_imgs_folder+'/face/face'+str(faceNumber)+str('.png'))
    baloon = mpimg.imread(local_imgs_folder+'/baloon/baloon'+str(baloonNumber)+str('.png'))
    logo = mpimg.imread(local_imgs_folder+'/logo/logo'+str(logoNumber)+str('.png'))
    plt.imshow(background)
    plt.imshow(face)
    plt.imshow(baloon)
    plt.imshow(logo)
    
    plt.axis('off')
    
    plt.savefig(local_imgs_folder+'/memes/meme'+str(memeName)+str('.png'), bbox_inches='tight')

    

#ViteMEME_IMAGE_PLOT(2, 1, 3, 1, 2)

# post MEMES to PROMOTE VITECOIN
def sendMesageVITE_Style():
    # language
    language_post = "en"
    if randint(0, 1) == 1:
        print('post to US')
        language_post = "en"
        #period_hour_USA = periodOfTheDay_USA()
    else:
        print('post to France')
        language_post = "fr"
        #period_hour_EUROPE = periodOfTheDay_EUROPE()

    #language_post = "fr" # en fixed by now

    # period of the day
    period_hour_EUROPE = periodOfTheDay_EUROPE()
    print('period_hour_EUROPE: ', period_hour_EUROPE)
    period_hour_USA = periodOfTheDay_USA()
    print('period_hour_USA: ', period_hour_USA)
    # message
    local_object = randint(0, len(gpsLocationsUsa)-1) # choose random place lat lon
    print('local_object: ', local_object)

    vite_meme = []

    MEME_ARRAY_LAST_PARAMETERS = [1,1,1,1,1] # background, face, glass, cap, blunt
    MEME_ARRAY_NEW_PARAMETERS = [1,1,1,1,1] 
    while MEME_ARRAY_NEW_PARAMETERS == MEME_ARRAY_LAST_PARAMETERS:
        MEME_ARRAY_NEW_PARAMETERS = [chooseBackground(period_hour_USA),chooseFace(period_hour_USA),chooseGlass(period_hour_USA),chooseCap(period_hour_USA),chooseBlunt(period_hour_USA)]

    print('-----1')

    if language_post == "en":  
        # txt msg to post
        txt_USA = textMessageToUSA(period_hour_USA)
        lat_post_USA = gpsLocationsUsa[local_object]["lat"]
        lon_post_USA = gpsLocationsUsa[local_object]["lon"]
        lat_lon_city = gpsLocationsUsa[local_object]["city"]

        searchTweets_EN("Crypto")
        random_accurate_msg_to_post = general_terms_PEOPLE_TALKING_ABOUT[randint(0, len(general_terms_PEOPLE_TALKING_ABOUT)-1)]
        print('-----2')
        # vite meme parts of the meme according the time of the day: morning, afternoon, night
        vite_meme = [{
            "background": str(MEME_ARRAY_NEW_PARAMETERS[0]),
            "face": str(MEME_ARRAY_NEW_PARAMETERS[1]),
            "glass": str(MEME_ARRAY_NEW_PARAMETERS[2]),
            "cap": str(MEME_ARRAY_NEW_PARAMETERS[3]),
            "blunt": str(MEME_ARRAY_NEW_PARAMETERS[4]),
            "lat_lon_city":str(lat_lon_city),
            "lat": lat_post_USA,
            "lon": lon_post_USA,
            "msg_post_level1":str(txt_USA), # general message to USA according Time of the day
            "msg_post_level2":str(random_accurate_msg_to_post), # message according what people are talking about Vite DAO
            "msg_post_level3":str(msg_VITE_PROMO_USA[randint(0, len(msg_VITE_PROMO_USA)-1)]) # add a promo text on message ? 
        }]
        print('-----3')
        

        # MEME IMAGE PLOT
        meme_name = str(datetime.timestamp(now)).replace('.', '', 900).replace('.', '', 900)
        # ViteMEME_IMAGE_PLOT(meme_name, randint(1,5), 1, randint(1,5), randint(1,5), randint(1,5))
        # ViteMEME_IMAGE_PLOT(memeName, backgroundNumber, faceNumber, glassNumber, bluntNumber, capNumber):
        ViteMEME_IMAGE_PLOT(meme_name, vite_meme[0]['background'], vite_meme[0]['face'], vite_meme[0]['glass'], vite_meme[0]['blunt'])
        print('-----4')
        # avoid repeat same meme
        MEME_ARRAY_LAST_PARAMETERS = MEME_ARRAY_NEW_PARAMETERS
        
        # ====== POST o/
        myMEME = str(local_imgs_folder+'/memes/meme'+str(meme_name)+str('.png'))
        str_vite_object_msg_name = str('msg_post_level')+str(randint(1,2)) # include promo msg: + msg_VITE_PROMO_USA...
        MEME_MSG = vite_meme[0][str(str_vite_object_msg_name)] + str(' #') + str(vite_meme[0]['lat_lon_city'])

        print('')
        print('meme: ' + str(myMEME))
        print('msg to post: ' + str(MEME_MSG))
        print('city: ' + str(lat_lon_city))

        if len(str(vite_meme[0][str(str_vite_object_msg_name)]))> 8:    
            print('')
            print('meme: ' + str(myMEME))
            print('msg to post: ' + str(MEME_MSG))
            
            tweetMEME(myMEME, MEME_MSG, vite_meme[0]['lat'], vite_meme[0]['lon'])
            print('====== ***** post to USA ok o/')
        else:
            print('==== <<<><><><> MEME_MSG USA was none')

        #tweetMEME(myMEME, MEME_MSG, vite_meme[0]['lat'], vite_meme[0]['lon'])
        




    if language_post == "fr":  
        print('-----5 fr')
        # txt msg to post
        txt_FRANCE = textMessageToFRANCE(period_hour_EUROPE)
        lat_post_FRANCE = gpsLocationsFrance[local_object]["lat"]
        lon_post_FRANCE = gpsLocationsFrance[local_object]["lon"]
        lat_lon_city = gpsLocationsFrance[local_object]["city"]
        print('-----6 fr')
        searchTweets_FR("Bitcoin")
        print('==>>> general_terms_PEOPLE_TALKING_ABOUT:')
        print(general_terms_PEOPLE_TALKING_ABOUT)
        print('')
        random_accurate_msg_to_post = general_terms_PEOPLE_TALKING_ABOUT[randint(0, len(general_terms_PEOPLE_TALKING_ABOUT)-1)]
        print('-----7 fr')
        # vite meme
        vite_meme = [{
            "background": str(MEME_ARRAY_NEW_PARAMETERS[0]),
            "face": str(MEME_ARRAY_NEW_PARAMETERS[1]),
            "glass": str(MEME_ARRAY_NEW_PARAMETERS[2]),
            "cap": str(MEME_ARRAY_NEW_PARAMETERS[3]),
            "blunt": str(MEME_ARRAY_NEW_PARAMETERS[4]),
            "lat_lon_city":str(lat_lon_city),
            "lat": lat_post_FRANCE,
            "lon": lon_post_FRANCE,
            "msg_post_level1":str(txt_FRANCE), # general message to USA according Time of the day
            "msg_post_level2":str(random_accurate_msg_to_post), # message according what people are talking about Vite DAO
            "msg_post_level3":str(msg_VITE_PROMO_FRANCE[randint(0, len(msg_VITE_PROMO_FRANCE)-1)]) # add a promo text on message ? 
        }]
        print('-----8 fr')
        # MEME IMAGE PLOT
        meme_name = str(datetime.timestamp(now)).replace('.', '', 900).replace('.', '', 900)
        # ViteMEME_IMAGE_PLOT(meme_name, randint(1,5), 1, randint(1,5), randint(1,5), randint(1,5))
        # ViteMEME_IMAGE_PLOT(memeName, backgroundNumber, faceNumber, glassNumber, bluntNumber, capNumber):
        ViteMEME_IMAGE_PLOT(meme_name, vite_meme[0]['background'], vite_meme[0]['face'], vite_meme[0]['glass'], vite_meme[0]['blunt'])
        print('-----9 fr')

        # ====== POST o/
        myMEME = str(local_imgs_folder+'/memes/meme'+str(meme_name)+str('.png'))
        str_vite_object_msg_name = str('msg_post_level')+str(randint(1,2)) # include promo msg: + msg_VITE_PROMO_USA...
        MEME_MSG = vite_meme[0][str(str_vite_object_msg_name)]+ str(' #') + str(vite_meme[0]['lat_lon_city'])


        
        if len(str(vite_meme[0][str(str_vite_object_msg_name)]))> 8:    
            print('')
            print('meme: ' + str(myMEME))
            print('msg to post: ' + str(MEME_MSG))
            tweetMEME(myMEME, MEME_MSG, vite_meme[0]['lat'], vite_meme[0]['lon'])
            print('====== ***** post to FRANCE ok o/')
        else:
            print('==== <<<><><><> MEME_MSG was none')




def checkMessagesToSend(_message):
    print('')
    msgs_tags = ["#1", "#2", "#3"]









# register all my followers -> open vite account -> dm user
def registerNewFollowerOnDB(_userid):
    with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'r') as jfile:
        # open JSONDB
        JSONDB = json.load(jfile)

        # search users and update my JSONDB
        user = api.get_user(str(_userid)) # my id : my followers

        print("Last 20 Followers:")
        for follower in user.followers():
            print(follower.name)
            print(follower.id)
            
            userFound = 0
            userAccount = 0

            print('search user on JSONDB: ', follower.id)

            for info in JSONDB:
                print('user  on JSONDB::: ',info)

                if str(info['userId']) == str(follower.id):
                    print('user already exists on JSONDB.')
                    userFound = 1
                    # has this follower and opened ACCOUNT???
                    if len(str(info['account']))>5: # ok this user has a VITE account
                        userAccount = 1
                        print('user already exists on JSONDB and has an ACCOUNT.')
                
            
            if userFound == 0: # register user
                print('register follower on JSONDB')
                from datetime import datetime
                dt = datetime.now()
                dt2 = str(dt)
                dt3_ts = str(datetime.timestamp(dt)).replace(".", "", 200)
                dataobject = {"userId": follower.id, "userName": follower.name, "walletStatus": 0, "regdate_ts":str(dt3_ts), "regdate":str(dt2), "account": ""}
                JSONDB.append(dataobject)
                # register user on db.
                with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'w') as fp:
                    json.dump(JSONDB, fp, indent=2)
                print('send DM to registered user on JSONDB>>>user: OPEN ACCOUNT and welcome TWITTER SERVICE')
                # ============================
                WELCOME_openAccountMessage = "Hi! Welcome o/ to ViteCoin! Like RT & Pin our page. Thank you and good luck.  vite.org"
                api.send_direct_message(follower.id, WELCOME_openAccountMessage)

                '''
                ===========================
                NEW VITE ACOOUNT ==========
                ===========================
                '''
                # generate account, update db and DM user.
                newPasswordGenerated = generateNewPassword()
                newAcc_VITE = asyncio.run(vite_generateNewVITEAccount_UPDATE(str(newPasswordGenerated), follower.id))

                WELCOME_openAccountMessage = "Hi! Welcome o/ to ViteCoin! Like RT & Pin our page. Thank you and good luck.  vite.org"
                api.send_direct_message(follower.id, WELCOME_openAccountMessage)

                VITE_VIEW_AccountMessage = "Hello! Welcome to VITE Coin o/ ! Here's your Vite Account: " + str(newAcc_VITE) 
                api.send_direct_message(follower.id, VITE_VIEW_AccountMessage)
                
                VITE_VIEW_AccountMessage = "Check your balance --> DM me with hashtag:  #ViteAccount " 
                api.send_direct_message(follower.id, VITE_VIEW_AccountMessage)

                VITE_VIEW_AccountMessage = "Tip someone by tweeting: @vitecointipbot #tip @user2 100 #vitecoin " 
                api.send_direct_message(follower.id, VITE_VIEW_AccountMessage)

                VITE_VIEW_AccountMessage = "DM me with hashtag: #ViteInfo more more details. Thank you!!! " 
                api.send_direct_message(follower.id, VITE_VIEW_AccountMessage)    
                #time.sleep(20)




            









def checkAnsweredMsgsOnVITE_TIPBOT_DB_answers(_msg_id):
    print('checking on JSONDB answers ')
    # if msgs answered ..... pass
    with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB_answers.json', 'r') as jfile:
        # open JSONDB
        JSONDB_answers = json.load(jfile)

        for reg in JSONDB_answers:
            print('==>> reg in JSONDB_answers: ', reg)
            msg_id = reg['msgId']
            msg_status = ['answerStatus']
            if str(msg_id) == str(_msg_id):
                if msg_status == 0: # reply DM and tag as answered
                    print('reply dm: ', msg_id)
                    return  1 # exists. not answered.
                return 2 # exists . already answered.
    return 0 # not found or already answered
    




# =======================================================
# === check users request based on hashtag 
# return info about vite or 
# =======================================================

def identifyTypeOfMessage(userid, hashtagsList):
    #hashtagsList2 = list(hashtagsList)
    print('hashtagLIST: ', hashtagsList)
    print('=== identifyTypeOfMessage * 1 to user DM: ', userid)
    for info in hashtagsList: # 'hashtags': [{'text': 'ViteAccount', 'indices': [0, 12]}]
        print('--- info: ', info)
        hashtag = info['text']
        print('=== identifyTypeOfMessage * 2 === hastags: ', hashtag)
        try:
            # ===============================================================================
            # === USER REQUEST MORE INFO ABOUT VITE. SEND VITE.ORG FOR MORE INFO DM
            # ===============================================================================
            if str(hashtag).upper() == str("VITEINFO"): # user request view or open account
                print('DM ViteInfo====')
                VITE_VIEW_AccountMessage = "Hello! Please visit vite.org for more info. Thank You!"
                api.send_direct_message(userid, VITE_VIEW_AccountMessage)


            # ===============================================================================
            # === USER REQUEST 'VITEACCOUNT' : user request view or open account
            # ===============================================================================
            if str(hashtag).upper() == str("VITEACCOUNT"): # user request view or open account
                print('check if open / view')
                # if user exists on db and if he has an account
                with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'r') as jfile:
                    # open JSONDB
                    JSONDB = json.load(jfile)
                    for item in JSONDB:
                        print('search user: ', userid)
                        user = item['userId']
                        useraccount = item['account']
                        print('***>>>comparing: ' + str(userid) + str(" with user 2 : ") + str(user))
                        if str(user) == str(userid): # user found on local JSON Database
                            if len(str(useraccount)) > 9: # user already has an account - view
                                print('VIEW ACCOUNT >>>')
                                try:
                                    accountBalance = asyncio.run(vite_checkAccountBalance(str(useraccount)))
                                    print('*** >>> BALANCE CHECKED ><><><><><>')
                                    return 1, str(useraccount), str(accountBalance)

                                except Exception as er:
                                    pass
                                    print('erro balance >>> ', er)

                            if len(str(useraccount)) < 9: # user doesn't have an account UPDATE***
                                print('OPEN ACCOUNT >>>')
                                # ============ DM USER - *** OPEN VITE ACCOUNT ***
                                return 2, str("0"), str("0")

                    print('user not found on db.')
                    return 0 # not found on db

        except Exception as er:
            pass
            return 3, 0, 0 # error

    print('----- retornar 000000') #no hashtags on list
    return 4, 0, 0 # no hashtags






def generateNewPassword():
    print('generating new password for new user...')
    numberOfChars_min = 4
    numberOfChars_max = 8
    especialChars = ["@", "@3", "@6", "@9", "1@", "a-", "-B", "ihj8@", "Jkl", "q9", "t7b", "", "2-u-", "=2w", "w=3", "n=s", "hy", "-@--", "a@t", "gt@", "9-@", "ed9", "pqc", "mck", "yc6", "hc-", "ic8", "drt", "-O-b", "g-dt", "-di", "us7", "8au", "0a9"]
    numberOfChars_pass = randint(numberOfChars_min, numberOfChars_max)
    #print('generating numberOfChars_pass: ', numberOfChars_pass)
    now_dt = datetime.now()
    #ts_dt = datetime.timestamp(now_dt)
    newdt = str(datetime.timestamp(now_dt)).replace('.', '', 900).replace('.', '', 900)
    #print('new datetime : ', newdt)
    newPassword = ""
    while  len(newPassword) <= numberOfChars_pass:
        newPassword += str(especialChars[randint(0, len(especialChars)-1)])
        # print('adding data to new password: ', newPassword)

    newPassword +=  newdt
    print('new passweord generated : ', newPassword)
    return str(newPassword)




def VITE_COMMAND_ViteAccount(_userid, _msgid, _msg):
    replyDM = checkAnsweredMsgsOnVITE_TIPBOT_DB_answers(_msgid)
    print('replyDM received: ', replyDM)
    answerType = 9999
    if replyDM == 0: # DM not answered yet. 
        print('DM not answered ===== check type of vite command: open account / view account to user: ', _userid)
        answerType, viteAccount, accountBalance = identifyTypeOfMessage(_userid, _msg)

        # ============================================
        # *** o/ open user's VITE ACCOUNT
        # ============================================
        
        if answerType == 0: # send DM and register user on JSONDB.
            print('>>>REGISTER User on DB and OPEN Account: ', viteAccount)
            # ============================================
            # === OPEN ACCOUNT with random password
            # === also register new user on JSONDB
            # ============================================
            newPasswordGenerated = generateNewPassword()
            newAcc_VITE = asyncio.run(vite_generateNewVITEAccount(str(newPasswordGenerated), _userid))

            if len(str(newAcc_VITE))>3:
                print('*** success ***')

                VITE_VIEW_AccountMessage = "Hello! Welcome to VITE Coin o/ ! Here's your Vite Account: " + str(newAcc_VITE) 
                api.send_direct_message(_userid, VITE_VIEW_AccountMessage)
                
                VITE_VIEW_AccountMessage = "Check your balance --> DM me with hashtag:  #ViteAccount " 
                api.send_direct_message(_userid, VITE_VIEW_AccountMessage)

                VITE_VIEW_AccountMessage = "Tip someone by tweeting: @vitecointipbot #tip @user2 100 #vitecoin " 
                api.send_direct_message(_userid, VITE_VIEW_AccountMessage)

                VITE_VIEW_AccountMessage = "DM me with hashtag: #ViteInfo more more details. Thank you!!! " 
                api.send_direct_message(_userid, VITE_VIEW_AccountMessage)                



        # ============================================
        # *** VIEW VITE ACCOUNT
        # ============================================

        if answerType == 1:
            print('>>>VIEW Account: ', viteAccount)
            VITE_VIEW_AccountMessage = "Hello!  Here's your Vite Account: " + str(viteAccount) + " Balance: " + str(accountBalance) + " VITE"
            api.send_direct_message(_userid, VITE_VIEW_AccountMessage)
            if float(accountBalance) == 0: # send invite to VITEX
                print('user has 0 balance. send promo ad vitex: ')
                VITE_VIEW_AccountMessage_invite = " Hey let's increase your VITE's amount? Try Vitex Exchange vitex.net " # optional promo ad messages
                api.send_direct_message(_userid, VITE_VIEW_AccountMessage_invite) # optional
                print('promo ad vitex SENT.')
            
            

        # ============================================
        # *** UPDATE VITE ACCOUNT
        # ============================================
        # ===
        # === OPEN ACCOUNT with random password
        # === also UPDATE new user on JSONDB
        # ============================================

        if answerType == 2: # exists on JSONDB but doesnt has an account. UPDATE 
            newPasswordGenerated = generateNewPassword()
            newAcc_VITE = asyncio.run(vite_generateNewVITEAccount_UPDATE(str(newPasswordGenerated), _userid))
            print('>>>open Account. update user on db ok.')
            VITE_VIEW_AccountMessage = "Hello!  Here's your Vite Account: " + str(newAcc_VITE)
            api.send_direct_message(_userid, VITE_VIEW_AccountMessage)


        if answerType == 4:
            print('>>>no hastags found on DM hashtag list...')

    #time.sleep(300)



# ======================================================================================================
# === check for new DM's then: Create account, view balance, invite to VITEX in case user has 0 balance.
# ======================================================================================================

def readDMs_VITE_Commands_requests(myID):
    print('...readDMs_VITE_Commands_requests :', myID)
    myDmMessages = api.list_direct_messages(count=20)
    for message in myDmMessages:
        print('===>>> ', message)
        DM_text = message.message_create['message_data']['entities']['hashtags']
        print('')
        print('=-=-=message data: ', message.message_create['message_data'])
        print('=-=-=message data: ', message.message_create['message_data']['entities'])
        print('=-=-=message data: ', DM_text)
        if len(list(DM_text))>0:
            print('lista de hash ok ====')
            # DM sent by me. ========
            if not (str(message.message_create['target']['recipient_id']) == str(myID)): 
                print('lets read users msgs.<<< CHECK THEIR REQUESTS via DM--- from: ' + str(myID) + str(" to: ") + str(message.message_create['target']['recipient_id']))
                # found RECEIVED MSG .
                # check if user wants to open or view account
                VITE_COMMAND_ViteAccount(message.message_create['target']['recipient_id'], message.id, list(DM_text)) 

        print('___***')


    print('end of read DM MSGS >>>> ')
    #time.sleep(30)



def save_TIP_REQUEST(_accountFrom, _accountTo, _viteAmount):
    print('start tip process.. SAVE TIP REQUEST JSON .>>>')



def check_Twitter_mentions_for_TIP_USERS():
    now = datetime.now()
    ts = datetime.timestamp(now)

    mentions = api.mentions_timeline(241282794, count=20) #VITECOINTIPBOT userid on twitter: 241282794

    mention_user1 = 0
    mention_hashtagtip = 0
    mention_user2 = 0
    mention_viteamount = 0
    mention_finaltag_vitecoin = 0

    for tweets in mentions:
        print('tweets id==========')
        print(tweets.id)
        print('')
        print('tweets user id:::::::::::::==========')
        print(tweets.user.id)
        print('')

        print(tweets.entities)
        # =====================================================
        # =========== Cehck if all tags on TIP command text is ok:
        # =====================================================
        # hashtag tip
        TIP_AMOUNT = 0

        

        if len(tweets.entities['hashtags']) >0:
            TIP_AMOUNT = tweets.entities['hashtags'][1]
            print('we have hashtags.')
            for data in tweets.entities['hashtags']:
                print(data)

                if str(data).upper() == str("TIP"):    
                    print('tip hashtag found.')
                    mention_hashtagtip = 1

        # mention_user1
        if len(tweets.entities['user_mentions']) >0:
            print('we have user_mentions.')
            for data in tweets.entities['user_mentions']:
                print(data)
                if str(data['screen_name']).upper() == str("VITECOINTIPBOT"):    
                    print('user_mentions1  found.')
                    mention_user1 = 1

        # mention_user2
        if len(tweets.entities['user_mentions']) >0:
            print('we have user_mentions.')
            tip_user = tweets.entities['user_mentions'][:-1]
            if not (str(tip_user) == str("VITECOINTIPBOT")):
                mention_user2 = 1

        print('')
        # =====================================================
        # =========== Cehck if all tags on TIP command text is ok:
        # =====================================================
        if mention_user1 == 1:
            if mention_hashtagtip == 1:
                if mention_user2 == 1:
                    if mention_viteamount == 1:
                        if mention_finaltag_vitecoin == 1: # ok, all requirenments ok on hashtag command to proceed to tip function.
                            print('--- ViteAccount ---------- ')
                            # check balance
                            data_ = ["ViteAccount"]
                            # 1, str(useraccount), str(accountBalance)
                            status_account, userAccount, accountBalance = identifyTypeOfMessage(tweets.user.id, data_)
                            
                            if int(status_account) == 1:
                                if float(accountBalance)>0:
                                    if float(TIP_AMOUNT) <= float(accountBalance):
                                        # DM user - Tip is processing...
                                        try:
                                            VITE_VIEW_AccountMessage_tip = "Hello! ViteCoinTipBot is processing your request... " 
                                            api.send_direct_message(tweets.user.id, VITE_VIEW_AccountMessage_tip) 
                                            if float(accountBalance)>0:
                                                print('tip user - VITE Transfer')

                                                # =========================================
                                                # =========================================

                                                # @vitecointipbot 
                                                amountViteToSend = TIP_AMOUNT
                                                '''

                                                # ========== subscription - ok tested
                                                _subscriptionNumber = asyncio.run(vite_PAY(tweets.user.id, str(userAccount), amountViteToSend))
                                                
                                                # =========================================
                                                # ===================TIP HERE==============


                                                
                                                tempResult = str("0")
                                                # checkPAY - ok tested
                                                tempResult = vite_check_PAY(_subscriptionNumber)
                                                result_checkPay = 0

                                                while not (str(tempResult) == str("1") or str(tempResult) == str("2")): # 1 - completed 2 - end of filter
                                                    print('waiting for payment ...')
                                                    tempResult = str(vite_check_PAY(_subscriptionNumber))

                                                if str(tempResult) == str("2"):
                                                    print('like tweet to inform that tip will be processed soon...')
                                                    #api.create_favorite(tweets.id)
                                                    VITE_VIEW_AccountMessage_tip = "Hello! ViteCoinTipBot is processing your request. you'll be noticed soon. " 
                                                    api.send_direct_message(tweets.user.id, VITE_VIEW_AccountMessage_tip) 

                                                if str(tempResult) == str("1"):
                                                    print('like tweet to inform that tip was succesfully done ###')
                                                    api.create_favorite(tweets.id)
                                                # ================ok tip done sucessfully o/=========================
                                                # =========================================
                                                '''


                                        except Exception as err:
                                            pass
                                            print('error while tip ...: ', err) # log this. 
                                            # notice user
                                            VITE_VIEW_AccountMessage_tip = "Hello! Something went wrong , please try again later." 
                                            api.send_direct_message(tweets.user.id, VITE_VIEW_AccountMessage_tip) 


                                    else:
                                        VITE_VIEW_AccountMessage_tip = "Hello! You don't have enough VITE to tip someone. Please visit Vitex.net " 
                                        api.send_direct_message(tweets.user.id, VITE_VIEW_AccountMessage_tip) 


                                if float(accountBalance)<1:
                                    VITE_VIEW_AccountMessage_tip = "Hello! You don't have enough VITE to tip someone. Please visit Vitex.net " 
                                    api.send_direct_message(tweets.user.id, VITE_VIEW_AccountMessage_tip)

                            




# readDMs_VITE_Commands_requests(241282794) # Twitter @vitecointipbot page owner's id: 241282794



timeToTweet_MEMES = 0
twts = 0
while True:
    try:
        
        # ======= OPEN VITE ACCOUNT FOR EVERY NEW FOLLOWER==========================================
        # if detect new follower this function will run. >>>
        # search my followers. register on JSONDB. send DM welcome and how to #openAccount
        registerNewFollowerOnDB(241282794)   # vitcointipbot : 241282794 serach my new followers
        # =========================================================================================

        # ====== CHEC DMS FROM USERS ===========================================================================
        # if detect NEW DM MESSAGE this function will run. >>>
        # ======================================================================================================
        # === check for new DM's then: Create account, view balance, invite to VITEX in case user has 0 balance.
        # ======================================================================================================
        readDMs_VITE_Commands_requests(241282794) # Twitter @vitecointipbot page owner's id: 241282794


        # =========================================================================================
        # run this function to promoted our page on France and United States
        # will post tweets in french language on France. Will post tweets in English language on US territory
        # === MEME GENERATOR ======================================================================
        if timeToTweet_MEMES == 0: # post meme on start bot
            sendMesageVITE_Style()
            timeToTweet_MEMES += 1
            
        if timeToTweet_MEMES >= 20: # random about 2 hours~ # every 2 hour post a diferent meme
            sendMesageVITE_Style() 
            timeToTweet_MEMES = 0
        # =========================================================================================

        # ======= TIP USERS =================================================
        # search for mentions to tip users: ======================
        # if user has account and balance >>> create / call transfer
        check_Twitter_mentions_for_TIP_USERS()





        print('')
        twts += 1
        print('------>>>> Tweet post ok n :', twts)
        timerWait = randint(300, 900)
        print('next tweet in: ', timerWait)

        import time as t
        from datetime import datetime
        t.sleep(timerWait)


    except Exception as err:
        pass
        print(err)




# teste memes
#ViteMEME_IMAGE_PLOT("1stvitememe", randint(1,5), randint(1,5), randint(1,5), randint(1,5))

