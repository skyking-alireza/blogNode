import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import {main_api} from '../../functions/main_api'
var mv = require('mv');
export const config = {
    api: {
       bodyParser: false,
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            var oldPath = files.logo[0].filepath;
            var newPath = `./public/images/posts/${files.logo[0].newFilename}${files.logo[0].originalFilename}`;
            mv(oldPath, newPath, function(err) {});
            console.log(fields);
            main_api('posts/newpost/',{data:{subject:fields.subject[0],descriptions:fields.descriptions[0],body:fields.body[0],logo:`${files.logo[0].newFilename}${files.logo[0].originalFilename}`},method:'POST'})
              .then(({data})=>{
                  res.status(201).json(data)
              })
              .catch(({response})=>{
                res.status(response.status).json(response.data)
              })

        })
    })

}