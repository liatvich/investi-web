/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {
  Link, IconButton, Typography, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Outlet
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import s from './App.module.scss';
// import { SignInScreen } from './routes/manager';
import { ProvideAuth, useProvideAuth } from './Hooks';
import { AppLayout } from './components/App/AppLayout';
import { Logo as LogoIcon } from './assets/logo';
import { Logo } from './components/Logo';
import welcome from './assets/welcome.png';
import personalize from './assets/personalize_icon.png';
import anna from './assets/team/Anna.png';
import annaAvatar from './assets/team/AnnaAvatar.png';
import nareed from './assets/team/Nareed.png';
import nareedAvatar from './assets/team/NareedAvatar.png';
import lucy from './assets/team/lucy.png';
import lucyAvatar from './assets/team/lucyAvatar.png';
import liat from './assets/team/liat.png';
import liatAvatar from './assets/team/liatAvatar.png';
import initiate from './assets/initiate_new_experiment_icon.png';
import distribute from './assets/distribute_icon.png';
import fistSectionInto from './assets/fistSectionInto.png';
import { Loader as LoaderIcon } from './assets/loader';
import { AppMobile } from './AppMobile';

export function App() {
  //   const { loggedUser } = useContext(UserContext);
  const { user } = useProvideAuth();
  const navigate = useNavigate();
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  const AppDeskTop = (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.firstSection}>
          <Logo color="#B6E4E4" withoutPaddingTop />
          <div className={s.firstSectionContent}>
            <div className={s.texts}>
              <div className={s.titleBlock}>
                <Typography variant="h2" component="div" className={s.title} style={{ color: '#1f1f1f' }}>
                  pet
                </Typography>
                <Typography variant="h2" component="div" className={s.title} style={{ color: '#3D67F3' }}>
                  data
                </Typography>
                <Typography variant="h2" component="div" className={s.title} style={{ color: '#1f1f1f' }}>
                  lab
                </Typography>
              </div>
              <Typography variant="h4" gutterBottom component="div" className={s.description}>
                AI-powered Citizen Science: Fast-track animal research, collect data, collaborate globally. Join now for scientific breakthroughs!
              </Typography>
              <div className={s.buttons}>
                <Button
                  variant="contained"
                  onClick={() => { navigate('/signin'); }}
                  startIcon={<TextSnippetOutlinedIcon className={s.note} />}
                  className={s.manager}
                >
                  Research Manager
                </Button>
                <Button variant="contained" onClick={() => { navigate('/research'); }} startIcon={<LogoIcon color="#ffffff" />} className={s.consumer}>
                  Research Participant
                </Button>
              </div>
            </div>
            <img src={fistSectionInto} alt="firstSectionIntro" className={s.image} />
          </div>
        </div>
        <div className={s.secondSection}>
          <Typography variant="h2" gutterBottom component="div" className={s.title}>
            Power up your research in three steps:
          </Typography>
          <div className={s.outer}>
            <div className={s.phase}>
              <img
                src={initiate}
                alt="initiate"
                className={s.image}
              />
              <Typography variant="h4" gutterBottom component="div" className={s.text}>
                Initiate a new experiment
              </Typography>
            </div>
            <div className={s.loader}>
              <LoaderIcon />
            </div>
            <div className={s.phase}>
              <img src={personalize} alt="personalize" className={s.image} />
              <Typography variant="h4" gutterBottom component="div" className={s.text}>
                Customize instructions, questions, and media
              </Typography>
            </div>
            <div className={s.loader}>
              <LoaderIcon />
            </div>
            <div className={s.phase}>
              <img src={distribute} alt="distribute" className={s.image} />
              <Typography variant="h4" gutterBottom component="div" className={s.text}>
                Distribute a mobile webview link to pet owners
              </Typography>
            </div>
          </div>
          <Typography variant="h4" gutterBottom component="div" className={s.bottomText}>
            Join now and transform your research process with ease!
          </Typography>
        </div>
        <div className={s.thirdSection}>
          <div className={s.top}>
            <Typography variant="h2" gutterBottom component="div" className={s.title}>
              Meet the team
            </Typography>
            <Typography variant="h4" gutterBottom component="div" className={s.description}>
              Presenting our dedicated team, ready to make a difference.
            </Typography>
          </div>
          <div className={s.cardSection}>
            <div className={s.card}>
              <img
                className={s.imageInner}
                src={anna}
                alt="distribute"
                onMouseOver={(e) => { e.currentTarget.src = annaAvatar; }}
                onMouseOut={(e) => { e.currentTarget.src = anna; }}
              />
              <div className={s.texts}>
                <Typography variant="h4" gutterBottom component="div" className={s.cardTitle}>
                  Prof. Anna Zamansky
                </Typography>
                <Typography variant="h4" gutterBottom component="div" className={s.description}>
                  Head of Tech4Animals Lab, University of Haifa
                </Typography>
              </div>
            </div>
            <div className={s.card}>
              <img
                className={s.imageInner}
                src={nareed}
                alt="distribute"
                onMouseOver={(e) => { e.currentTarget.src = nareedAvatar; }}
                onMouseOut={(e) => { e.currentTarget.src = nareed; }}
              />
              <div className={s.texts}>
                <Typography variant="h4" gutterBottom component="div" className={s.cardTitle}>
                  Nareed H Farhat
                </Typography>
                <Typography variant="h4" gutterBottom component="div" className={s.description}>
                  Tech4Animals Tech Lead, University of Haifa
                </Typography>
              </div>
            </div>
            <div className={s.card}>
              <img
                className={s.imageInner}
                src={lucy}
                alt="distribute"
                onMouseOver={(e) => { e.currentTarget.src = lucyAvatar; }}
                onMouseOut={(e) => { e.currentTarget.src = lucy; }}
              />
              <div className={s.texts}>
                <Typography variant="h4" gutterBottom component="div" className={s.cardTitle}>
                  Lucy Shulman
                </Typography>
                <Typography variant="h4" gutterBottom component="div" className={s.description}>
                  Project Manager, University of Haifa
                </Typography>
              </div>
            </div>
            <div className={s.card}>
              <img
                className={s.imageInner}
                src={liat}
                alt="distribute"
                onMouseOver={(e) => { e.currentTarget.src = liatAvatar; }}
                onMouseOut={(e) => { e.currentTarget.src = liat; }}
              />
              <div className={s.texts}>
                <Typography variant="h4" gutterBottom component="div" className={s.cardTitle}>
                  Liat Vichman
                </Typography>
                <Typography variant="h4" gutterBottom component="div" className={s.description}>
                  Master Student, Open University of Israel
                </Typography>
              </div>
            </div>
          </div>
          <div className={s.footer}>
            <div className={s.findUs}>
              <div className={s.haifa}>
                <Typography variant="h4" gutterBottom component="div" className={s.description}>
                  Haifa University,
                </Typography>
                <div className={s.link}>
                  <Typography variant="h4" gutterBottom component="div" className={s.description}>
                    Department of
                  </Typography>
                  <Link
                    component="button"
                    variant="body2"
                    className={s.linkText}
                    onClick={() => {
                      window.open('https://is-web.hevra.haifa.ac.il/index.php/en/', '_blank');
                    }}
                  >
                    Information Systems
                  </Link>
                </div>
              </div>
            </div>
            <div className={s.separatorFirst} />
            <div className={s.email}>
              <Link
                component="a"
                variant="body2"
                className={s.link}
                height="mailto:tech4a.haifa@gmail.com"
              >
                tech4a.haifa@gmail.com
              </Link>
            </div>
            <div className={s.separatorSecond} />
            <div className={s.social}>
              <IconButton disableRipple onClick={() => { window.open('https://twitter.com/tech4animals', '_blank'); }}>
                <FacebookOutlinedIcon className={s.icon} />
              </IconButton>
              <IconButton disableRipple onClick={() => { window.open('https://www.facebook.com/tech4animals', '_blank'); }}>
                <TwitterIcon className={s.icon} />
              </IconButton>
            </div>
            <div className={s.separator} />
            <div className={s.copyRight}>
              <Typography variant="h4" gutterBottom component="div" className={s.description}>
                © 2023 by Tech4Animals
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProvideAuth>
      <div>
        {user ? <AppLayout />
          : isMobile ? (<AppMobile />) : (
            AppDeskTop
          )}
      </div>
    </ProvideAuth>
  );
}

export default App;
// 3 dots instead the line
