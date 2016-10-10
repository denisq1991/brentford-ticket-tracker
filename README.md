What it does
------------

This is a small Node.js app that makes a request to the Brentford FC website and checks the availability of tickets for the Newcastle United home game.
The Brentford website requires a Cookie generated the first time you visit the website so therefore I make two concurrent requests.

How to Use
------------

To run the app you must first install node and run 'npm install' from within the root of this folder to install the 'request' module which is the only required module.
If you wish to send an email from the notifier shell script replace the subject, address and body with your required text.
If you are using gmail you must add the adress of your machine to the list of contacts or it will be filtered into your spam folder.

Create a a json file called 'config.json' in the root of this folder and populate it with the following information:

```json
{
             "urlString":"[The website you wish to make the request to]",
             "keyword":"[The keyword you wish to check for]",
             "cookieValue":"[The value of the cookie you wish to send, alternatively you can leave this as a blank string]",
             "shellPath":"[The path to a shell script which sends an email to your address with your chosen text']"
 }
 ```

In my particular case I am running this app through a cron job at specific times of the day.
If you plan to do this make sure to specify the full path of your node.js installation by running 'which node' and the full path of server.js within this project.
