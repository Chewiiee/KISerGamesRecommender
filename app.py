#!/usr/bin/env python

from flask import Flask, render_template, json, request
import pymysql.cursors
from flask import Markup
from flask import Flask
import re

app = Flask(__name__)




@app.route('/')
def main():
    return render_template('index.html')

@app.route('/login')
def login():
    connection = pymysql.connect(host="127.0.0.1",
                                        user="root",
                                        password="",
                                        db="essbar",
                                        charset='utf8mb4',
                                        cursorclass=pymysql.cursors.Cursor)
    with connection.cursor() as cursor:
        sql = "SELECT img_href, title, recipe_href FROM kochbar_recipes WHERE kochbar_recipes.img_href  !='http://bilder.static-fra.de/kochbar/images/kb_default_kein_rezeptbild_120x80.jpg' ORDER BY RAND() LIMIT 10"
        cursor.execute(sql, )
        result = cursor.fetchall()
    connection.close()

    print(result[0])
    print(result[0][0])

    convResult = list()
    titleList = list()
    href_list = list()

    for r in range(0, len(result)):
        convResult.append(result[r][0])
        titleList.append(result[r][1])
        href_list.append(result[r][2])

    print(href_list)
    return render_template('tinder.html', result=convResult, title=titleList, recipe_href=href_list)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, host="0.0.0.0")
