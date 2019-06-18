import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './UserProfile.module.css';
import { followUser } from '../../store/actions/users';
import img from '../../assets/img/profileImg.png';
import FollowerItem from '../../components/FollowerItem/FollowerItem';

const UserProfile = ({
  user,
  showEdit,
  followUser,
  following,
  unFollowUsers,
}) => {
  const [tab, setTab] = useState('events');
  return (
    <div className={classes.UserProfile}>
      <div className={classes.UserProfile_info}>
        <div className={classes.UserProfile_img}>
          <img src={(user && user.avatar) || img} alt="404" />

          {showEdit && (
            <Link to="/edit-profile" className={classes.edit_profile}>
              Editar Perfil
            </Link>
          )}

          {!showEdit && (
            <button
              className={classes.follow}
              type="button"
              onClick={() => followUser(user && user._id)}
            >
              {(following && 'Siguiendo') || 'seguir'}
            </button>
          )}
        </div>
        <div className={classes.UserProfile_description}>
          <div className={classes.UserProfile__name}>
            {user && user.name} {user && user.lastName}
          </div>
          <div className={classes.UserProfile__user}>
            @{user && user.username}
          </div>
          <div className={classes.UserProfile__description}>
            {user && user.aboutMe}
          </div>
          <div className={classes.UserProfile__loation}>
            {user && user.city}
          </div>
          <div className={classes.UserProfile__company}>Netflix</div>
        </div>

        {showEdit && (
          <div className={classes.newFollowers}>
            <div className={classes.newFollowers_title}>Nuevos seguidores</div>
            <div className={classes.newFollowers_containers}>
              {unFollowUsers &&
                unFollowUsers.map(unFollowUser => (
                  <FollowerItem
                    key={unFollowUser._id}
                    {...unFollowUser}
                    onFollowUser={() => followUser(unFollowUser._id)}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      <div className={classes.UserProfile_details}>
        <button
          type="button"
          className={[
            classes.button_tab,
            tab === 'events' ? classes.active_tab : '',
          ].join(' ')}
          onClick={() => setTab('events')}
        >
          Eventos
        </button>
        <button
          type="button"
          className={[
            classes.button_tab,
            tab === 'following' ? classes.active_tab : '',
          ].join(' ')}
          onClick={() => setTab('following')}
        >
          Siguiendo
        </button>
        <button
          type="button"
          className={[
            classes.button_tab,
            tab === 'followers' ? classes.active_tab : '',
          ].join(' ')}
          onClick={() => setTab('followers')}
        >
          Seguidores
        </button>
      </div>
      <div className={classes.hr} />
      <div
        className={classes.tab_content}
        style={tab === 'events' ? { display: 'grid' } : { display: 'none' }}
      >
        events
      </div>
      <div
        className={classes.tab_content}
        style={tab === 'following' ? { display: 'grid' } : { display: 'none' }}
      >
        following
      </div>
      <div
        className={classes.tab_content}
        style={tab === 'followers' ? { display: 'grid' } : { display: 'none' }}
      >
        followers
      </div>
    </div>
  );
};

export default connect(
  null,
  { followUser }
)(UserProfile);
