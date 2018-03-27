#!/usr/bin/env python

from flask import Flask, render_template, json, request
import pymysql.cursors
from flask import Markup
from flask import Flask

app = Flask(__name__)




@app.route('/')
def main():
    return render_template('index.html')

@app.route('/showSignUp')
def showSignUp():
    connection = pymysql.connect(host="localhost",
                                        user="kochbar",
                                        password="r5Hn7WhX9eROFiKT",
                                        db="kochbar",
                                        charset='utf8mb4',
                                        cursorclass=pymysql.cursors.Cursor)
    with connection.cursor() as cursor:
        sql = "SELECT img_href FROM kochbar_recipes ORDER BY RAND() LIMIT 10"  
        cursor.execute(sql, )
        result = cursor.fetchall()
    connection.close()
    r = result
    print(r)
    return render_template('tinder.html', result=r)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
