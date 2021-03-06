import React from 'react';
import RepoList from '../RepoList/RepoList';
import Contacts from '../Contacts/Contacts';
import styles from './About.module.css';
import Card from '@material-ui/core/Card';
import Ocktokit from '@octokit/rest';


const octokit = new Ocktokit();
const userName = 'KsuBurn';

type AboutStateType = {
  isLoading: boolean;
  repoList: {
    id: string;
    svn_url: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    name: string;
    updated_at: string;
  }[];
  infoAboutUser: {
    avatar_url: string;
    name: string;
    bio: string;
  };
  isError: boolean;
  firstRepo: number;
  lastRepo: number;
}

class About extends React.Component<{}, AboutStateType> {
  state = {
    isLoading: true,
    repoList: [],
    infoAboutUser: {
      avatar_url: '',
      name: '',
      bio: '',
    },
    isError: false,
    firstRepo: 0,
    lastRepo: 5
  };

  componentDidMount() {
    octokit.repos.listForUser({
      username: userName,
      per_page: 100
    })
    .then(({ data }): void => {
      this.setState({ 
        repoList: data,
        isLoading: false
      });
    })
    .catch((): void => {
      this.setState({ 
        isLoading: false,
        isError: true,
      });
    });

    octokit.users.getByUsername({
      username: userName
    })
    .then(({data}): void => {
      this.setState({
        infoAboutUser: {
          avatar_url: data.avatar_url,
          name: data.name,
          bio: data.bio,
        },
        isLoading: false,
      });
    })
    .catch((): void => {
      this.setState({ 
        isLoading: false,
        isError: true,
      });
    });
  };

  onClickNext = (): void => {
    this.setState({
      firstRepo: this.state.firstRepo + 5,
      lastRepo: this.state.lastRepo + 5
    });
  };

  onClickBack = (): void => {
    this.setState({
      firstRepo: this.state.firstRepo - 5,
      lastRepo: this.state.lastRepo - 5
    });
  };

  render() {
    const { isLoading, repoList, isError, infoAboutUser } = this.state;

    return(
      <div className={styles.wrap}>
        <Card className={styles.user_card}>
          {isLoading ?
            <div className={styles.preloader}></div> :
            <div>
              {isError ?
                <div className={styles.info_about_user}>
                  <h1 className={styles.name}>Kseniya Burnashova</h1>
                  <Contacts />
                </div> :
                <div className={styles.user}>
                  <img src={infoAboutUser.avatar_url} alt='???????? ????????????????????????' className={styles.user_avatar} />
                  <div className={styles.info_about_user}>
                    <h1 className={styles.name}>{infoAboutUser.name}</h1>
                    <div className={styles.bio}>{infoAboutUser.bio}</div>
                    <Contacts />
                  </div>
                </div>
              }
            </div>
          }
        </Card>
        <Card className={styles.repo_card}>
          {isLoading ?
            <div>
              <h3 className={styles.title}>?????????????????????? ???? github.com</h3>
              <div className={styles.preloader}></div>
            </div> :
            <div>
              {isError ?
                <div className={styles.error_wrap}>
                  <h3 className={styles.title}>?????????????????????? ???? github.com</h3>
                  <div className={styles.error}>
                    <div className={styles.error_image}></div>
                    <p className={styles.error_message}>??????-???? ?????????? ???? ??????...</p>
                    <p className={styles.message_try_again}>
                      ???????????????????? <a href='.'>??????????????????</a> ?????? ??????
                    </p>
                  </div>
                </div> :
                <div>
                  {repoList.length === 0 ?
                    <div className={styles.error_wrap}>
                      <h3 className={styles.title}>?????????????????????? ???? github.com</h3>
                      <div className={styles.error}>
                        <div className={styles.error_image}></div>
                        <p className={styles.error_message}>?????????????????????? ??????????????????????</p>
                        <p className={styles.message_try_again}>
                          ???????????????? ?????? ?????????????? ???????? ?????????????????????? ???? <a href='github.com'>github.com</a>
                        </p>
                      </div>
                    </div> :
                    <RepoList
                      repoList={repoList}
                      onClickNext={this.onClickNext}
                      onClickBack={this.onClickBack}
                      firstRepo={this.state.firstRepo}
                      lastRepo={this.state.lastRepo}
                    />
                  }
                </div>
              }
            </div>
          } 
        </Card>
      </div>
    )
  };
}

export default About;
