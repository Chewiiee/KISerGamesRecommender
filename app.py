#!/usr/bin/env python

from flask import Flask, render_template, json, request
import pymysql.cursors
from flask import Markup
from flask import Flask
import re

app = Flask(__name__)




@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    return render_template('greetings.html', email=request.form['email'], password=request.form['password'], password_confirmation=request.form['password_confirmation'])

@app.route('/login')
def login():
    connection = pymysql.connect(host="localhost",
                                        user="kochbar",
                                        password="bratwurstconfiture",
                                        db="kochbar",
                                        charset='utf8mb4',
                                        cursorclass=pymysql.cursors.Cursor)
    with connection.cursor() as cursor:
        sql = "SELECT img_href, title FROM kochbar_recipes WHERE kochbar_recipes.img_href  !='http://bilder.static-fra.de/kochbar/images/kb_default_kein_rezeptbild_120x80.jpg' ORDER BY RAND() LIMIT 10" 
        cursor.execute(sql, )
        result = cursor.fetchall()
    connection.close()
    convResult = list()
    for r in result:
    	r = str(r)
    	r = re.sub("\(.{2}|'.*",'', r)
    	convResult.append(r)

    titleList = list()
    for r in result:
        r = str(r)
        r = re.sub(".*u'|..$",'', r)
        r.decode("utf-8", "ignore")
        titleList.append(r)
    return render_template('tinder.html', result=convResult, title=titleList)




if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, host="0.0.0.0")
