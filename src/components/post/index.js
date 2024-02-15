import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header.js';
import Image from './image.js'
import Actions from './actions.js'
import Footer from './footer.js';
import Comments from './comments.js';

export default function Post ({ content }) {
    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();
    
    return (
        <div className='rounded col-span-4 border bg-white border-gray-primary mb-12'>
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username}/>
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.string.isRequired,
        likes: PropTypes.string.isRequired,
        comments: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired
    })
}