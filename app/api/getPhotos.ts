import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/FirebaseConfig';
import { ref, get, child } from 'firebase/database'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const competitionsRef = ref(database, 'competitions'); 
    const competitionsSnapshot = await get(competitionsRef); 

    if (!competitionsSnapshot.exists()) {
      return res.status(404).json({ success: false, message: 'No competitions found' });
    }

    const competitions = competitionsSnapshot.val(); 
    let totalPhotosUploaded = 0;
    let totalPhotosUploadedInLast7Days = 0;

    const today = new Date();
    const past7Days = new Date(today.setDate(today.getDate() - 7)); 


    for (const competitionKey in competitions) {
      const teams = competitions[competitionKey]?.teams || {}; 

      for (const teamKey in teams) {
        const photos = teams[teamKey]?.photos || {}; 

        for (const photoKey in photos) {
          const photo = photos[photoKey];
          const uploadTimestamp = new Date(photo.timestamp); 

         
          totalPhotosUploaded++;

          if (uploadTimestamp >= past7Days) {
            totalPhotosUploadedInLast7Days++;
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      totalPhotosUploaded,
      totalPhotosUploadedInLast7Days,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ success: false, message: 'Error fetching statistics' });
  }
}
