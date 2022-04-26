#Importing the required libraries
import urllib
import urllib.request
import urllib.parse
import os
import sys
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import numpy as np
import matplotlib.pyplot as plt
import random
from gtts import gTTS
from playsound import playsound

#Creating a text to speech function
def speak(text, filename):
    tts = gTTS(text, lang = 'en')
    filename = filename + '.mp3'
    tts.save(filename) #Saving the audio file
    playsound(filename) #Playing the audio

#Creating a diary class for storing shopping information
class Diary():
    def __init__(self):
        #Initializing the class variables
        self.budget = 0
        self.products = []
        self.costs = []
        self.cost_total = 0

    #Defining a function to reset the values
    def __reset__(self):
        self.budget = 0
        self.products = []
        self.costs = []
        self.cost_total = 0

#Adding more functions to the Diary class for user accessibility
class Diary(Diary):
    def add_product(self, product_name, product_cost):
        self.cost_total += product_cost
        self.products.append(product_name)
        self.costs.append(product_cost)

    def add_budget(self, budget):
        self.budget = budget

#Welcoming the user
print("Welcome to AK Commerce Platform! Wishing you a happy and reliable shopping.")
speak("Welcome to AK Commerce Platform! Wishing you a happy and reliable shopping.", '111')

#Reading the flipkart_df file using pandas module
flipkart_df = pd.read_csv("flipkart_data.csv")

#Creating a function to send free sms using api call
def sendSMS(number, message):
    import requests

    url = "https://sms77io.p.rapidapi.com/sms"

    payload = "to={}&p=IN8ZlzzM6QJpcbhEwOCP5qc8mV5E8KFDuLnGijL3CdUqmBKgQFQDf6FsuEfBWAJ8&text={}".format(number, message)
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'x-rapidapi-key': "c9a50d71bbmsh986ce6928856767p1381e8jsn95185302faab",
        'x-rapidapi-host': "sms77io.p.rapidapi.com"
    }

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)

#Creating a function to search for a product's reviews on amazon using ASIN
def amazon_search(asin):
    import requests

    url = "https://amazon-product4.p.rapidapi.com/product/reviews"

    querystring = {"asin": asin}

    headers = {
        'x-rapidapi-key': "c9a50d71bbmsh986ce6928856767p1381e8jsn95185302faab",
        'x-rapidapi-host': "amazon-product4.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    text = response.text

    print(text)

#Creating a function similar to previous one, but this time using UPS instead of ASIN to get prices of products
def barcode_comparison(barcode):
    import requests

    url = "https://ebay-com.p.rapidapi.com/products/" + barcode

    headers = {
        'x-rapidapi-key': "c9a50d71bbmsh986ce6928856767p1381e8jsn95185302faab",
        'x-rapidapi-host': "ebay-com.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    text = response.text

    print(text)

#Giving the user a bunch of options
speak('''
Press 1 to see product reviews and prices across online stores like Amazon and Ebay
Press 2 to see live deals and coupons across various shopping platforms
Press 3 to contact retail services or shop owners
Press 4 to explore Amazon Prime Movies
Press 5 to store shopping costs and records, that is, to plan your shopping
''', '112')

command1 = int(input('''
Press 1 to see product reviews across online stores like Amazon and Ebay
Press 2 to see live deals and coupons across various shopping platforms
Press 3 to contact retail services or shop owners
Press 4 to explore Amazon Prime Movies
Press 5 to store shopping costs and records, that is, to plan your shopping
'''))

#Main code
if command1 == 1:
    speak("Please enter the preferred store number (amazon reviews - 1, multistore comparison - 2, flipkart indian store prices - 3) ", '113')
    store = int(input("Please enter the preferred store number (amazon - 1, multistore comparison - 2, flipkart indian store - 3) "))

    if store == 1:
        speak("Search for an item via asin", '114')
        asin = input("Search for an item via asin....")

        amazon_search(asin)

    elif store == 2:
        speak("Please enter the barcode", '115')
        barcode = input("Please enter the barcode....")

        barcode_comparison(barcode)

    elif store == 3:
        print("Below are some of the product examples in table format: ")
        speak("Below are some of the product examples in table format", '116')
        print(flipkart_df.head())

        speak("Please enter the unique id of the product offered by the flipkart indian store", '118')
        id1 = input("Please enter the unique id of the product offered by the flipkart indian store: ")

        hello1 = []

        for i in flipkart_df["uniq_id"]:
            hello1.append(str(i))

        if id1 in hello1:
            print("Id found")
            speak("Id found", '1001')

            id1_index = list(flipkart_df["uniq_id"]).index(id1)

            original_price = flipkart_df["retail_price"][id1_index]
            discounted_price = flipkart_df["discounted_price"][id1_index]

            print("Original Price is ", original_price)
            print("Discounted Price is ", discounted_price)

            speak("Original Price is " + str(original_price), '119')
            speak("Discounted Price is " + str(discounted_price), '120')

            speak("Do you wish to visit the page url? Press small y for yes and small n for no", '121')
            decision1 = input("Do you wish to visit the page url?(y/n) ")

            if decision1 == "y":
                driver = webdriver.Chrome("chromedriver")
                driver.get(flipkart_df["product_url"][id1_index])

            elif decision1 == "n":
                print("Thanks for using our app!")
                speak("THanks for using our app!", '122')
                input("Press any key to exit.")
                speak("PRess any key to exit", '123')

                sys.exit()

        else:
            print("Id not found")
            print("System exiting....Open again........")
            speak("Id not found", '124')
            speak("System exiting Open again", '125')

            sys.exit()

if command1 == 2:
    store_name = input("Please enter the store name you want to get coupons/deals for: ")

    def site_automation1(url):
        driver = webdriver.Chrome("chromedriver")

        driver.get(url)

        target = driver.find_element_by_name("q")

        target.clear()
        target.send_keys(store_name)
        target.send_keys(Keys.ENTER)

    site_automation1("https://couponfollow.com/site")

    confirmation = input("Did this work? (y/n): ")

    if confirmation == "y":
        print("Thank you for using our app!")

    elif confirmation == "n":
        driver = webdriver.Chrome("chromedriver")
        driver.get("https://www.grabon.in/")

if command1 == 3:
    speak("Please enter your area", '234')
    area = input("Please enter your area (us, uk, india): ")
    speak("Please enter your search keyword", '345')
    keyword = input("Please enter your search keyword: ")

    if area.lower() == "us":
        driver = webdriver.Chrome("chromedriver")
        driver.get("https://www.justdial.com/us/")

        target = driver.find_element_by_id("srchbox")

        target.clear()
        target.send_keys(keyword)
        target.send_keys(Keys.ENTER)

        number = input("Please copy and paste the number you want to send sms to (along with the country code without '+'): ")
        name = input("Please enter your name: ")
        message = input("Please enter your message to the retailer: ")

        resp = sendSMS(number, "Sent by: " + name + "\n" + message)
        print(resp)

if command1 == 4:
    #Reading the movies_df file using the pandas module
    movies_df = pd.read_csv("movies_data.csv")

    x = movies_df["IMDb"]
    y = movies_df["Prime Video"]

    plt.xlabel("IMDb Rating")
    plt.ylabel("Availability on Prime Video")
    plt.bar(x, y, color = 'pink')
    plt.show()

    print("The plot shows the usual relation between IMDb rating of movies and the availability of the respective movies on Prime Video.")

    command2 = int(input("Press 1 to get random lists of movies available on Prime Video\nPress 2 to search for a movie's Rating via its id\nPress 3 to visit Prime Video's website"))

    if command2 == 1:
        list1 = movies_df["Title"]

        for i in range(5):
            print(random.choice(list1))

    if command2 == 3:
        driver = webdriver.Chrome("chromedriver")
        driver.get("https://www.amazon.com/Amazon-Video/b/?&node=2858778011&ref=dvm_MLP_ROWNA_US_1")

    if command2 == 2:
        print("Feature under Development.") #This feature is currently under development

if command1 == 5:
    speak("Please enter your budget: ", '12345')
    budget = float(input("Please enter your budget in usd: ")) #Taking user input of the budget

    Diary = Diary() #Creating a new reference of the Diary class

    Diary.add_budget(budget)

    speak("Please enter the number of products you want to buy", '1243254')
    num_products = int(input("Please enter the number of products you want to buy: "))

    if type(num_products) == int and num_products == 0:
        speak("It looks like you don't want to buy any product for now. Let's exit the talk then.", '9896')
        print("It looks like you don't want to buy any product for now. Let's exit the talk then.")
        print("System exiting....")
        input("press any key to exit....")

        sys.exit()

    elif type(num_products) != int:
        speak("Please open the app again and specify a valid input.")
        print("System exiting....")
        input("Press any key to exit....")

        sys.exit()

    else:
        for i in range(num_products):
            #Taking user input of the name and the cost of the product
            product_name = input("Please enter the name of the product: ")
            product_cost = float(input("Please enter the cost of the product in usd: "))

            Diary.add_product(product_name, product_cost) #Adding the details of the product

        #Writing the content to a text file
        with open('Shopping.txt', 'w') as file1:
            file1.writelines("New shopping plan\n")
            file1.writelines("Budget: {}\n".format(Diary.budget))
            file1.writelines("Products: \n")
            for j in range(len(Diary.products)):
                file1.writelines('Product name: {} \nCost: {}\n'.format(Diary.products[j], Diary.costs[j]))

            #Status of the budget
            if Diary.budget < Diary.cost_total:
                print("You do not have enough money to buy the desired items.")
            elif Diary.budget == Diary.cost_total:
                print("Your budget will be empty after the shopping")
            else:
                print("Nothing to worry. Costs do not exceed the budget.")