import { firebase, FieldValue } from '../lib/firebase.js';

export async function doesUsernameExist(username) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get();
  
    return result.docs.length > 0;
  }
  

  export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

    const user = result.docs.map((item) =>({
        ...item.data(),
        docId: item.id
    }));

    return user;
  }

//   export async function getSuggestedProfiles(userId, following) {
//     const result = await firebase.firestore().collection('users').limit(10).get();

//     console.log(result)
//     return result
//     // return result.docs
//     //     .map((user) => ({ ...user.data(), docId: user.id }))
//     //     .filter((profile) => profile.userId != userId && !following.includes(profile.userId));

//     // return result.docs
//     // .map((user) => ({ ...user.data(), docId: user.id }))
//     // .filter((profile) => profile.userId )
//   }

  export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');
    
    if (following.length > 0) {
      query = query.where('userId', 'not-in', [...following, userId]);
    } else {
      query = query.where('userId', '!=', userId);
    }
    const result = await query.limit(10).get();
  
    const profiles = result.docs.map((user) => ({
      ...user.data(),
      docId: user.id
    }));
  
    console.log('profiles', profiles)
    return profiles;
  }
  

  export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    return firebase.firestore().collection('users').doc(loggedInUserDocId)
    .update({
        following: isFollowingProfile
            ? FieldValue.arrayRemove(profileId)
            : FieldValue.arrayUnion(profileId)
    });
  }


  export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
    return firebase.firestore().collection('users').doc(profileDocId)
    .update({
        followers: isFollowingProfile
            ? FieldValue.arrayRemove(loggedInUserDocId)
            : FieldValue.arrayUnion(loggedInUserDocId)
    });
  }


  export async function getPhotos(userId, following) {
    const result = await firebase.firestore().collection('photos').where('userId', 'in', following).get()

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
  }))

    console.log('userFollowedPhotos', userFollowedPhotos)

    const photosWithUserDeatails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }
            const user = await getUserByUserId(photo.userId)
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDeatails;
  }