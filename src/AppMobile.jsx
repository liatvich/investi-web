/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import {
  Link, IconButton, Typography, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Outlet
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import s from './Appmobile.module.scss';
import { Logo as LogoIcon } from './assets/logo';
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
import { LogoNew as LogoIconNew } from './assets/logonew';
import tech4animals from './assets/Logo-4site.png';

export function AppMobile() {
  const navigate = useNavigate();

  // document.getElementById('secondSection').style.minHeight = `${window.innerHeight}px`;

  const firstSection = useRef(null);
  const secondSection = useRef(null);

  useEffect(() => {
    if (firstSection?.current?.style) {
      firstSection.current.style.minHeight = `${window.innerHeight}px`;
    }

    if (secondSection?.current?.style) {
      secondSection.current.style.minHeight = `${window.innerHeight}px`;
    }
  }, [firstSection, secondSection]);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.firstSection}>
          <div className={s.firstSectionContent} ref={firstSection}>
            <div className={s.texts}>
              <div className={s.titleBlock}>
                <LogoIconNew color="#2C3D8F" />
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
                <Button variant="contained" onClick={() => { navigate('/research'); }} startIcon={<LogoIcon color="#ffffff" />} className={s.consumer}>
                  Research Participant
                </Button>
              </div>
            </div>
            <img src={fistSectionInto} alt="firstSectionIntro" className={s.image} />
          </div>
        </div>
        <div className={s.secondSection} ref={secondSection}>
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
            <div className={s.separatorFirst} />
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
            <div className={s.separatorSecond} />
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
            <div className={s.separatorThird} />
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
}

export default AppMobile;
