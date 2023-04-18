# Create package tasklist

nuv package update tasklist -p redis redis://redis

nuv action update tasklist/ping ping.js

nuv action invoke tasklist/ping -r

nuv action update tasklist/get get.js --web=true

nuv action update tasklist/set set.js --web=true

nuv action update tasklist/del del.js --web=true

nuv action update tasklist/all all.js --web=true
