import express from 'express';
import randomstring from 'randomstring';
import Database from './utils/Database';
import urlModel from './models/urlModel';
import config from './config/development';
import cors from 'cors';
import validUrl from 'valid-url';
//var validUrl = require('valid-url');
const app = express();
const database = new Database();

app.use(cors({
  origin: config.allowedDomain,
}));
  
app.listen(config.tinyurlPort, () => console.log(`Example app listening on port ${config.tinyurlPort}!`));

app.post('/tinyurl', (req, res) => {
  try {
    if( req.query.longUrl && 
        typeof(req.query.longUrl) == "string" && 
        req.query.longUrl != "") {

      if (!validUrl.isUri(req.query.longUrl)) {
        throw('Invalid URL provided, please try again');
      }

      const hash = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
      });
      const shortUrl = `http://${config.tinyurlDomain}:${config.tinyurlPort}/${hash}`;
      const urlModelObject = new urlModel(req.query.longUrl, hash, shortUrl);
      insertUrlModel(urlModelObject, (err, result) => {
        if (err) {
          res.send('Error occured in insertion', err);
        }
        res.send(urlModelObject);
      });
    } else {
      res.send('longUrl not provided in request.');
    }
  } catch (ex) {
    console.log('Exception occured in tinyurl post request, details: ', ex);
    throw ex;
  }
});

app.get('/:hash([a-zA-Z0-9]{6,})', (req, res) => {
  try {
    if( req.params.hash && 
      typeof(req.params.hash) == "string" && 
      req.params.hash != "") {
      getHashUrl(req.params.hash, (err, result) => {
        if (err) {
          res.send('Error occured in fetching hash', err);
        }
        const urlModelObject = new urlModel(result.long_url, result.hashkey, result.short_url);
        res.redirect(301, urlModelObject.longUrl);
        //res.send(urlModelObject);
      });
    }
  } catch (ex) {
    console.log(ex);
  }
});


const getHashUrl = async (hash, callback) => {
  try {
    const hashUrls = await database.getById(hash);
    callback(null, hashUrls);
  } catch (ex) {
    console.log(ex);
    e.request = call.request;
    callback(ex);
  }
}

const insertUrlModel = async (urlModelObject, callback) => {
  try {
    const response = await database.insert(urlModelObject);
    callback(null, response);
  } catch (ex) {
    console.log('Exception occured in insertUrlModel', ex);
  }
}
