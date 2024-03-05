/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
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
import { AppMobile } from './AppMobile';
import { LogoNew } from './assets/logonew';
import tech4animals from './assets/Logo-4site.png';

export function App() {
  //   const { loggedUser } = useContext(UserContext);
  const { user } = useProvideAuth();
  const navigate = useNavigate();
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  const AppDeskTop = (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.firstSection}>
          <div className={s.firstSectionContent}>
            <div className={s.outer}>
              <div className={s.logo}>
                <LogoNew className={s.logo} />
              </div>
              <div className={s.texts}>
                <div className={s.titleBlock}>
                  <Typography variant="h2" component="div" className={s.title} style={{ color: '#1f1f1f' }}>
                    pets
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
                    disableRipple
                  >
                    Research Manager
                  </Button>
                  <Button disableRipple variant="contained" onClick={() => { navigate('/research'); }} startIcon={<LogoIcon color="#ffffff" />} className={s.consumer}>
                    Research Participant
                  </Button>
                </div>
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
                alt="Start"
                className={s.image}
              />
              <Typography variant="h4" gutterBottom component="div" className={s.text}>
                Start a new experiment
              </Typography>
            </div>
            <div className={s.loader}>
              <div className={s.first} />
              <div className={s.second} />
              <div className={s.third} />
            </div>
            <div className={s.phase}>
              <img src={personalize} alt="personalize" className={s.image} />
              <Typography variant="h4" gutterBottom component="div" className={s.text}>
                Customize instructions, questions, and media
              </Typography>
            </div>
            <div className={s.loader}>
              <div className={s.first} />
              <div className={s.second} />
              <div className={s.third} />
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
        </div>
        <div className={s.footer}>
          <div className={s.top}>
            <div className={s.names}>
              <div className={s.logo}>
                <LogoNew width="30px" />
                <div className={s.texts}>
                  <Typography variant="h5" component="div" className={s.logoTexts} style={{ color: '#FFFFFF' }}>
                    pets
                  </Typography>
                  <Typography variant="h5" component="div" className={s.logoTexts} style={{ color: '#3D67F3' }}>
                    data
                  </Typography>
                  <Typography variant="h5" component="div" className={s.logoTexts} style={{ color: '#FFFFFF' }}>
                    lab
                  </Typography>
                </div>
              </div>
              <div
                className={s.pet}
                onClick={() => { window.open('https://www.tech4animals.org/', '_blank'); }}
              >
                <img
                  src={tech4animals}
                  alt="tech4animals"
                  className={s.petLogo}
                />
              </div>
            </div>
            <div className={s.right}>
              <div className={s.social}>
                <Typography variant="h6" component="div" className={s.title} style={{ color: '#FFFFFF' }}>
                  Follow
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  className={s.linkText}
                  onClick={() => { window.open('https://twitter.com/tech4animals', '_blank'); }}
                  underline="none"
                >
                  Twitter
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  className={s.linkText}
                  onClick={() => { window.open('https://www.facebook.com/tech4animals', '_blank'); }}
                  underline="none"
                >
                  Facebook
                </Link>
              </div>
              <div className={s.contact}>
                <Typography variant="h6" component="div" className={s.title} style={{ color: '#FFFFFF' }}>
                  Contact us
                </Typography>
                <div className={s.haifa}>
                  <Typography variant="h6" component="div" className={s.description}>
                    Haifa University,
                  </Typography>
                  <div className={s.link}>
                    <Typography variant="h6" component="div" className={s.description}>
                      Department of
                    </Typography>
                    <Link
                      component="button"
                      variant="body2"
                      className={s.linkText}
                      underline="none"
                      onClick={() => {
                        window.open('https://is-web.hevra.haifa.ac.il/index.php/en/', '_blank');
                      }}
                    >
                      Information Systems
                    </Link>
                  </div>
                  <Link
                    component="a"
                    variant="body2"
                    className={s.linkText}
                    underline="none"
                    height="mailto:liatvai@gmail.com"
                  >
                    liatvai@gmail.com
                  </Link>
                </div>
              </div>
              <div className={s.location}>
                <Typography variant="h6" component="div" className={s.title} style={{ color: '#FFFFFF' }}>
                  Location
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  className={s.linkText}
                  underline="none"
                  onClick={() => {
                    window.open('https://www.google.com/maps/place/Rabin+Building,+University+of+Haifa/@32.7611883,35.0199683,15z/data=!4m6!3m5!1s0x151dbab9c4b12a97:0x9c2e673af21b5b9c!8m2!3d32.7611883!4d35.0199683!16s%2Fg%2F11c6x97rb9?entry=ttu', '_blank');
                  }}
                >
                  Rabin Building
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  className={s.linkText}
                  underline="none"
                  onClick={() => {
                    window.open('https://www.google.com/maps/place/University+of+Haifa/@32.724029,35.0357874,12.07z/data=!4m6!3m5!1s0x151dbab83f7be8ab:0x475fdbcf84359ab8!8m2!3d32.7614296!4d35.0195184!16zL20vMDIwNzA1?entry=ttu', '_blank');
                  }}
                >
                  Abba Khoushy Ave 199,
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  className={s.linkText}
                  underline="none"
                  onClick={() => {
                    window.open('https://www.google.com/maps/place/University+of+Haifa/@32.724029,35.0357874,12.07z/data=!4m6!3m5!1s0x151dbab83f7be8ab:0x475fdbcf84359ab8!8m2!3d32.7614296!4d35.0195184!16zL20vMDIwNzA1?entry=ttu', '_blank');
                  }}
                >
                  Haifa, 3498838
                </Link>
              </div>
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.copyRight}>
              <Typography variant="h4" gutterBottom component="div" className={s.description}>
                © 2023 by Tech4Animals
              </Typography>
            </div>
          </div>
          {/* <div className={s.findUs}>
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
              height="mailto:liatvai@gmail.com"
            >
              liatvai@gmail.com
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
          <div className={s.separator} /> */}
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
