from bs4 import BeautifulSoup
import requests
import urllib.request
import time
import random
import decimal
import sys

headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'My User Agent 1.0',
    'From': 'qwerty@aol.com'
})

# format arg1 aka searchText - "Boston, NY"
searchText = sys.argv[0]
city = ""
state = ""
cityFinished = False
for x in searchText:
    if not cityFinished:
        if(x != ","):
            city += x
        else:
            cityFinished = True
    else:
        if (x != " "):
            state += x

checkin = sys.argv[4] + " " + sys.argv[5] + " " + sys.argv[6]
checkout = sys.argv[7] + " " + sys.argv[8] + " " + sys.argv[9]


class Listing:
    def __init__(self, name, price, beds, checkin, checkout, rating, features, imgs):
        self.name = name
        self.price = price
        self.beds = beds
        self.rating = rating
        self.features = features
        self.imgs = imgs
# method format = (city, stateOrCountry, adults, beds, checkinyear, checkinmonth, checkinday, checkoutyear, checkoutmonth, checkoutday)


def getData():
    listArg = list()
    urlArg = ('https://www.expedia.com/Hotel-Search?&beds=' + sys.argv[3] + '&d1=' + sys.argv[4] + '-' + sys.argv[5] + '-' + sys.argv[6] + '/' +
              '%2F&d2=' + sys.argv[7] + '-' + sys.argv[8] + '-' + sys.argv[9] +
              '%25&destination=' + city +
              "%20%28and%20vicinity%29%2C%20"
              + state + '&sort=RECOMMENDED')
    #print (urlArg)
    # print("\n\n")
    page = requests.get(urlArg, headers=headers)
    soup = BeautifulSoup(page.text, 'lxml')
    price = soup.findAll('span', {'data-stid': 'content-hotel-lead-price'})
    titles = soup.findAll('h3', class_='is-visually-hidden')
    externalLink = soup.findAll('a', {'class': 'listing__link uitk-card-link'})
    counter = 0
    loopCounter = 0
    if len(titles) > len(price):
        loopCounter = len(price)
    elif len(titles) < len(price):
        loopCounter = len(titles)
    else:
        loopCounter = len(titles)
    for i in range(loopCounter):
        externalLink[i]['href'] = 'https://expedia.com' + \
            externalLink[i]['href']
        listArg.append(Listing(titles[i].text, price[i].text, sys.argv[3], checkin, checkout,
                               random.uniform(4.0, 4.6), getFeatures(), externalLink[i]['href']))
    return (listArg)


def printData(list):
    for item in list:
        print(item.name + "\n" + item.price + "\n" + str(round(item.rating, 1)
                                                         ) + "\n" + str(item.features) + '\n' + item.imgs + "\n\n")


def getFeatures():
    features = ['In-Room Amenities', 'Free Breakfast', 'Fitness Center', 'Free Wifi',
                'Coffee Kits', 'Mobile Check-In', 'Tennis Courts', 'Basketball Court', 'Recreational Acitivites']
    randomList = list()
    featureList = list()
    randomList = random.sample(range(0, 8), 4)
    for item in randomList:
        featureList.append(features[item])
    return (featureList)


hotelList = getData()
printData(hotelList)
sys.stdout.flush()
