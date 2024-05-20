host = "http://127.0.0.1:8000"

//ngrok
host = "https://immortal-molly-free.ngrok-free.app"

//python any where
host = 'https://vuquanghuydev.pythonanywhere.com'

let dev = true;
export const API_ROOT = dev ?  'https://immortal-molly-free.ngrok-free.app/api/v1/' :  'https://vuquanghuydev.pythonanywhere.com/api/v1/'

export const appName = "MOVE CARE"
export const hotNumber = "0984218xxx"



const startNgrokScripts = "ngrok http --domain immortal-molly-free.ngrok-free.app 8000"
