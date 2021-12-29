# Online Marketplace

<div align="center">
<img src="https://github.com/MohamedAhmed412000/Marketplace/blob/main/market%20online.png" width="400" >  

![GitHub language count](https://img.shields.io/github/languages/count/mohamedali1252/market-place?color=%2300&logo=GitHub)
![GitHub contributors](https://img.shields.io/github/contributors/mohamedali1252/market-place?color=%2300&logo=GitHub)

	This project is a distributed online marketplace.

</div> 

## Table of contents
<!--ts-->
* [Background](#background)
* [Technologies](#technologies)
* [Features](#features)
* [Pre-installed](#pre-installed)
* [Things-you-need](#things-you-need)
<!--te-->

## Background
This marketplace allows user to buy and sell his/her products.
Only registered members can buy/sell.
User can search by category or by name to show the searched items, add his/her item and add the price he/she wants.
User can add items to his cart, show old items he/she buy or sell in his/her account page, and can show his items.
Stores also can sign in our website, and add users items to their market and vice versa.


## Technologies
### Front-end
HTML, CSS, Bootstrap, VueJS

### Back-end
NodeJS

### Distributed Database
MongoDB

## Features
#### User can create an account
#### User can show all items on the marketplace
#### User can search by name or search by category
#### User can add many items to cart
#### Each item can be bought with any amount in the same order
#### User can show old products that he/she buy or sell
#### User can show items add to his/her market to buy them in addition to other users items
#### User can add new product to his market

## Pre-installed
	you must have node js installed at your computer.
	(npm install)to install the dependincies that exist in the code.

## Things-you-need
	you must have connction to the database.
	npm start to start the code in port 5000 and the local host.
	you have to put the Css files and images in the public folder in the backend folder.
	the html files will be included in views folder in the form of (.ejs) such as: <%- content -%> in it.
	if we want to include the login.html in a file called login.ejs we will write: <%- include('Frontend/Login/login.html'); -%> relatively from the directory of views.
	the .env file have the database Link, the Username and the password must be replaced with the real username and password.
	the .env file have the secret keys that you should take them from me directly.
