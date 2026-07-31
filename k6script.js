import http from 'k6/http';
import { check, sleep } from 'k6';
import {Rate} from 'k6/metrics';
export let errorRate = new Rate('errors');
export let options = {
  vus: 10000, // Number of virtual users
  duration: '1m', // Duration of the test
};

export default function(){
//    const body = JSON.stringify({
//         slot_id: "cms4ipckh000qz7y1y3nh766r",
//         guestName: `User-${__VU}`,
//         guestEmail: `user${__VU}@example.com` 
//     });
    const params = {
        headers: {
            //"Content-Type": "application/json",
            'x-user-id': '2',
        },
    };
    let response=http.get('http://localhost:3001/api/events',params);
    let success=response.status===200;
    errorRate.add(!success);
    sleep(1/100);
}