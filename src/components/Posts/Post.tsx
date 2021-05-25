import React, { useEffect, useState } from 'react';
import UserButton from '../Buttons/UserButton';
import Button from '../Buttons/Button';
import './Post.scss';
import PostWhoSaw from './PostWhoSaw';
import { firestore } from '../FirebaseApp';
import { getDoc } from '../FirebaseApp';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import app from '../FirebaseApp';
import ChatRoomCard from '../ChatRoom/ChatRoomCard';
import { Comments, createdAt } from '../Home/Home';
import Messages from '../Assets/Messages';

export type Props = {
  uid: string;
  postImage: string;
  content: string;
  postId?: string;
  comments?: any;
};

type User = {
  createdAt: createdAt;
  description: string;
  email: string;
  fullname: string;
  investExp: string;
  profileImg: string;
};
function Post(props: Props) {
  const [postUser, setPostUser] = useState<User | any>();

  const [postComments, setPostComments] = useState<Comments[]>(
    props.comments.slice(0, 3)
  );
  const [userInfo, setUserInfo] = useState<User | any>();
  const currentUser = app.auth().currentUser;
  const [showLoad, setShowLoad] = useState(false);

  useEffect(() => {
    firestore
      .collection('users')
      .doc(props.uid)
      .get()
      .then(data => {
        data && setPostUser(data.data());
      });
    getDoc(currentUser).then(data => setUserInfo(data));

    if (props.comments.length > 3) {
      setShowLoad(true);
    }
    if (props.comments.length < 5) {
      setShowLoad(false);
    }
    if (props.comments.length === postComments.length) {
      setShowLoad(false);
    }
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    //@ts-ignore
    const docId = e.target.closest('.post')?.dataset.id;
    const { text } = e.target.elements;

    if (
      currentUser &&
      userInfo &&
      text.value.length > 0 &&
      text.value !== ' '
    ) {
      try {
        await firestore
          .collection('posts')
          .doc(docId)
          .update({
            comments: firebase.default.firestore.FieldValue.arrayUnion({
              text: text.value,
              commentorUid: currentUser.uid,
              ...userInfo,
              createdAt: new Date(),
            }),
          });
        text.value = '';
        firestore
          .collection('posts')
          .doc(docId)
          .onSnapshot(snapshot => {
            setPostComments(snapshot.data()?.comments);
            setShowLoad(false);
          });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  function handleClick() {
    setPostComments(props.comments.slice(0, postComments.length + 5));
  }

  return (
    <div
      className={props.postImage ? 'post with-img' : 'post'}
      data-id={props.postId}
    >
      <Link
        to={{ pathname: '/profile/' + props.uid, state: { uid: props.uid } }}
        style={{ textDecoration: 'none' }}
      >
        <UserButton
          hasInfo
          userInfo={{ name: postUser?.fullname, exp: postUser?.investExp }}
          userImg={postUser?.profileImg}
        />
      </Link>
      {props.postImage && (
        <img className='post-img' src={props.postImage} alt='Post image' />
      )}
      <p className='post-content'>{props.content}</p>

      <br />
      <hr />
      <div className='bottom-div'>
        <div className='bottom-div_comments_wrapper'>
          <span className='bottom-div_comments_wrapper_title'>
            All comments
            <Messages />
          </span>
          <span>
            <PostWhoSaw comments={props.comments} />
          </span>
        </div>
        {props.comments &&
          postComments.map((el: Comments) => {
            const Timestamp = firebase.default.firestore.Timestamp;
            const getDate = new Timestamp(
              el.createdAt?.seconds,
              el.createdAt?.nanoseconds
            ).toDate();
            const [, month, date, year, hour] = getDate.toString().split(' ');
            const time = `${date} ${month} ${year} ${hour}`;

            return (
              <ChatRoomCard
                key={time + Math.random()}
                fullname={el.fullname}
                profileImg={el.profileImg}
                text={el.text}
                uid={currentUser?.uid}
                time={time}
              />
            );
          })}
        {showLoad && (
          <div className='load-more' onClick={handleClick}>
            Load more
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <input type='text' name='text' placeholder='Write a comment' />
            <Button type='primary' text='Comment' />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
