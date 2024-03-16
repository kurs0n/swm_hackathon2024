from selenium import webdriver
from selenium.webdriver.common.by import By
import json

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=chrome_options)
driver.get("https://www.krakow.pl/sport//247778,artykul,sport_w_krakowie___zobacz_na_mapie.html")

categories_list = driver.find_element(by=By.NAME, value="searchCategoryId")
categories_elementos = driver.find_elements(by=By.TAG_NAME, value="option")

categories_elementos.pop(0)
list = []
for element in categories_elementos:
    list.append(element.text)
data = {'Places': []}

i = 0
categories_lenght = len(categories_elementos)

for i in range(len(categories_elementos)):
    categories_list = driver.find_element(by=By.NAME, value="searchCategoryId")
    categories_elements = driver.find_elements(by=By.TAG_NAME, value="option")
    categories_elements.pop(0)


    categories_elements[i].click()
    find_button = driver.find_element(by=By.CSS_SELECTOR, value=".button--dark")
    find_button.click()
    object_list = driver.find_element(by=By.CLASS_NAME, value="article-map-points__table__content")
    objects = object_list.find_elements(by=By.TAG_NAME, value="p")

    for object_ in objects:
        data["Places"].append({
        "category": list[i],
        "address": object_.text
        })
# data["Categories"] = {category: {"Addresses": []} for category in data["Categories"]}

file_name = "places.json"

with open(file_name, "w") as file:
    json.dump(data, file)


