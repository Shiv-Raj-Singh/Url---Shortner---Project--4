# Url---Shortner---Project--4
An URL shortener is a website that reduces the length of your URL (Uniform Resource Locator). The idea is to minimize the web page address into something that's easier to remember and track. There are many URL shorteners on the market today, including Bit.ly, Goog.

# Model 

```Schema = 
    {
    urlCode: {
        type: String, 
        unique : true
    } ,
    longUrl: {
        type: String,
        unique: true, 
    } ,
    shortUrl:{
        type: String, 
        unique: true, 
    }
}
```
- # Cache Memory (Redis)
* Used Redis To fetch the Data if Data not exist then fetch from Database along with set that data in redis as well and next when user hit the same req then fetch that data from Cache Memory 

#  Dependencies ( used Packages )
- axios
- cors
- dotenv
- express
- ioredis
- mongoose
- shortid
- valid-url


# Error Response 

```
Error Response  = {
      status : false , 
      message : '' 
}
```

# Successful Response 

```
response = {
      status : true , 
      message : 'Data From ( DataBase/ Redis )' , 
      data : data }
```

