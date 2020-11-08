
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <Servo.h>

//1. Change the following info
#define FIREBASE_HOST "iot-project-da695.firebaseio.com"
#define FIREBASE_AUTH "zLnMfOzA77OAmI6lF9G04JnGktPRFAj7bMML3MB4"
//#define WIFI_SSID "iBall-Baton"
//#define WIFI_PASSWORD "G12345678"
#define WIFI_SSID "Redmi"
#define WIFI_PASSWORD "gaureshk"


// Define FirebaseESP8266 data object for data sending and receiving
FirebaseData firebaseData;

// global varible declared
   String getpass;
   String getstate;
   String doorpass="iotproject1234";   
// servo object 
Servo myservo;

void setup()
{
  getpass.reserve(50);  // reserve 50 bytes in memory to save for string manipulation 
  getstate.reserve(50);
  
  myservo.attach(5);  // attaches the servo on pin 5 (D1) to the servo object

  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  //4. Enable auto reconnect the WiFi when connection lost
  Firebase.reconnectWiFi(true);

}

void loop()
{
  // data stored in firebase will be fetched and stored in global varibles
  if(Firebase.getString(firebaseData, "/data/password"))
  {
    getpass=firebaseData.stringData();
    Serial.println(getpass);
  }else{
    Serial.print("Error in getdata, ");
    Serial.println(firebaseData.errorReason());
  }

   if(Firebase.getString(firebaseData, "/data/option"))
  {
    getstate=firebaseData.stringData();
    Serial.println(getstate);
  }else{
    Serial.print("Error in getdata, ");
    Serial.println(firebaseData.errorReason());
  }

  if(!doorpass.compareTo(getpass) && (getstate=="OPEN")){
    myservo.write(0);
    delay(100);
  }

  if(!doorpass.compareTo(getpass) && (getstate=="CLOSE")){
    myservo.write(90);
    delay(100);
  }

  delay(100);

}
