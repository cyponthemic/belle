import axios from 'axios'
import {values} from 'lodash-es'

export default async function(context) {
  let version = 'published';

  return axios.get('https://api.storyblok.com/v1/cdn/links', {
    params: {
      version: version,
      token: 'lVNHPozYedEoxZotaBKjJgtt'
    },
  }).then((res) => {
    return values(res.data.links).map((link)=>{
      return link.real_path
    })
  }).catch((res) => {
    console.error(res)
  })
}

// "id": 3710173,
//   "slug": "work",
//   "name": "Work",
//   "is_folder": true,
//   "parent_id": 0,
//   "published": false,
//   "position": -673535,
//   "uuid": "1fc53756-abd7-41e1-b368-7cc54386557c",
//   "is_startpage": false,
//   "real_path": "/work"
