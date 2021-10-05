import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { headingOne, headingThree } from '../styles/typography';
import { buttonPrimary } from '../styles/button';
import { columnStack, rowStack, center } from '../styles/layout';
import SidebarLayout from '../layout/SidebarLayout';
import { goTo } from '../hooks/utils';


const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
    background: 'url(imgs/heros/landing-photo.jpg)',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    ...center,
    ...columnStack("2rem")
  },
  heading: {
    ...headingOne,
    marginBottom: '4rem'
  },
  primaryButton: buttonPrimary,

  buttonContainer: {
    [theme.breakpoints.up('md')]: rowStack("3rem"),
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      ...columnStack("2rem"),
      '& > button': {
        width: '100%'
      }
    }
  },

  h3: {
    ...headingThree,
    fontWeight: 'bold'
  },
  iconBox: {
    ...center,
    flexDirection: 'column',
    '& > img': { marginBottom: '1rem' },
    marginTop: '1rem'
  }
}))



const LandingPage: React.FunctionComponent = () => {
  const classes = useStyles()

  const goToSignup = goTo('signup')

  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop()) {
        $('#backtotoparea').show();
      } else {
        $('#backtotoparea').hide();
      }
    });

    $("#backtotoparea").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    // contained within live_feed.js
    window.setFeedElements()
    window.setupFeedElements()
    window.getLiveData()
  })

  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>

      <div id="wrapper_cuminu">
          <header>
            <nav id="navmenu1920">
              <div className="containermenu1920">
                <div id="logov1">
                  <a href="https://cuminu.io/"><img className="logo-update" src="img/main.png"></a>
                </div>
                {/* <!--end logo v1--> */}
                <div id="menulist">
                  <ul>
                    <li><a href="#statistics">Statistics</a></li>
                    <li><a href="#tokenomics">Tokenomics</a></li>
                    <li><a href="#roadmaparea">Roadmap</a></li>
                    <li><a className="goToPlatform" href="#" target="_blank">Platform</a></li>
                    <li><a href="https://cuminu.medium.com/" target="_blank">Blog</a></li>
                    <li><a href="#socialmedia">Media</a></li>
                    <li><a href="#">Links</a>
                      <ul>
                        <li><a href="https://twitter.com/CumInuToken" target="_blank">Twitter</a></li>
                        <li><a href="https://t.me/CumInuToken" target="_blank">Telegram</a></li>
                        <li><a
                            href="https://www.dextools.io/app/uniswap/pair-explorer/0x7b412f141996411401f57e2ba1bc2235af807d4d"
                            target="_blank">DEXT</a></li>
                        <li><a href="https://solidity.finance/audits/CumInu/" target="_blank">Solidity Audit</a></li>
                        <li><a href="https://etherscan.io/address/0xd6327ce1fb9D6020E8C2c0E124A1eC23DCAb7536"
                            target="_blank">Etherscan</a></li>
                        <li><a
                            href="https://team.finance/view-coin/0xd6327ce1fb9D6020E8C2c0E124A1eC23DCAb7536?name=Cum%20Inu&amp;symbol=CUMINU"
                            target="_blank">Token Locks</a></li>
                        <li><a href="cuminu-whitepaper.pdf" target="_blank">White Paper</a></li>
                        <li><a href="cuminu-researchReport.pdf" target="_blank">Research Report</a></li>
                      </ul>
                    </li>
                  </ul>

                </div> 
                {/* <!-- end menulist--> */}
                <div id="buttonsrightv1">
                  <a className="creatorprereg" href="#hero" id="creatorpreregbtn">Creator Pre-register</a>
                  <a className="swapBtn swap-btn" target="_blank" href="swap/index.html"><svg xmlns="http://www.w3.org/2000/svg"
                      width="24.421" height="30" viewBox="0 0 24.421 30">
                      <defs>
                        <style>
                          .a {
                            fill: #f8f7f7;
                          }
                        </style>
                      </defs>
                      <path className="a"
                        d="M-177.5,142.244l.02-9.217,6.554,4.6Zm18.474-1.628-5.114,3.577-5.172-3.662-6.063,4.257,11.084,7.847,11.214-7.844Zm-5.125-9.5,5.054,3.579,6.018-4.226-11.069-7.838-11.228,7.855,6.051,4.25Z"
                        transform="translate(177.5 -122.636)" />
                    </svg>Swap</a>
                </div>
                {/* <!-- end buttons right --> */}
              </div>
            </nav>
            {/* <!--end nav menu 1920px--> */}
            <nav id="navmenu1200">
              <div className="containermenu1200">
                <div id="logov2">
                  <a href="https://cuminu.io/"><img className="logo-update" src="img/main.png"></a>
                </div>
                {/* <!--end logo v1--> */}
                <div className="buttonsrightv2" id="buttonsrightv2">
                  <a className="creatorprereg" href="#hero" id="creatorpreregbtn">Creator Pre-register</a>
                  <a className="swapBtn swap-btn" target="_blank" href="swap/index.html"><svg xmlns="http://www.w3.org/2000/svg"
                      width="24.421" height="30" viewBox="0 0 24.421 30">
                      <defs>
                        <style>
                          .a {
                            fill: #f8f7f7;
                          }
                        </style>
                      </defs>
                      <path className="a"
                        d="M-177.5,142.244l.02-9.217,6.554,4.6Zm18.474-1.628-5.114,3.577-5.172-3.662-6.063,4.257,11.084,7.847,11.214-7.844Zm-5.125-9.5,5.054,3.579,6.018-4.226-11.069-7.838-11.228,7.855,6.051,4.25Z"
                        transform="translate(177.5 -122.636)" />
                    </svg>Swap</a>
                  <ul>
                    <li className="menuopen"><a id="openmenu2"><img src="img/menu.png"></a></li>
                  </ul>
                </div>
                {/* <!--end buttons right--> */}
                <div className="clear"></div>
              </div>
            </nav>
            {/* <!--end nav menu 1920px--> */}
            <nav id="navmenu700">
              <div className="containermenu700">
                <div id="">
                  <a href="#"><img className="logo-update" src="img/main.png"></a>
                </div>
                {/* <!--end logo v1--> */}
                <div id="">
                  <ul>
                    <li><a id="openmenu3"><img className="logo-update" src="img/menu.png"></a></li>
                  </ul>
                </div>
                {/* <!--end buttons right--> */}
              </div>
            </nav>
            {/* <!--end nav menu 1920px--> */}
            <div id="dropdownmenuv2">
              <ul>
                <li><a href="#statistics">Statistics</a></li>
                <li><a href="#tokenomics">Tokenomics</a></li>
                <li><a href="#roadmaparea">Roadmap</a></li>
                <li><a href="cuminu-whitepaper.pdf" target="_blank">White Paper</a></li>
                <li><a href="cuminu-researchReport.pdf" target="_blank">Research Report</a></li>
                <li><a className="goToPlatform" target="_blank">Platform</a></li>
                <li><a href="https://cuminu.medium.com/" target="_blank">Blog</a></li>
                <li><a href="#socialmedia">Media</a></li>
              </ul>
            </div>
            <div id="dropdownmenuv3">
              <ul>
                <li><a href="#statistics">Statistics</a></li>
                <li><a href="#tokenomics">Tokenomics</a></li>
                <li><a href="#roadmaparea">Roadmap</a></li>
                <li><a className="goToPlatform" target="_blank">Platform</a></li>
                <li><a href="https://cuminu.medium.com/" target="_blank">Blog</a></li>
                <li><a href="#socialmedia">Media</a></li>
                <li><a href="/cuminu-whitepaper.pdf" target="_blank">White Paper</a></li>
                <li><a href="/cuminu-researchReport.pdf" target="_blank">Research Report</a></li>
                <li><a className="swap-btn" target="_blank" href="/swap/index.html">Swap</a></li>
                <li><a className="creatorprereg" href="#hero" style="padding:0!important; margin: 0; border: none; ">Creator
                    Pre-register</a></li>
              </ul>
            </div>

          </header>
          {/* <!--end header--> */}

          <div id="formpopup">
            <div id="closebtnform">
              <a id="closenowform"><i className="fas fa-times"></i></a>
            </div>
            <div className="formcontentcontainer">
              <div id="formcontent">
                <div className="errorMsg"
                  style="background-color: orange; color: white; padding: .8rem; 1.3rem; text-align: center; margin-bottom: 1rem; display: none;">
                  An error occured</div>
                <div id="logoform">
                  <img src="img/form.png">
                </div>
                <h3>Pre-register to become a creator</h3>
                <form id="preRegForm" name="preRegForm" action="#" method="post">
                  <input type="text" name="name" placeholder="Full Name">
                  <input type="email" name="email" placeholder="Email address">
                  <select name="country">
                    <option value="0">Country of residence</option>
                    <option value='Afghanistan'> Afghanistan</option>
                    <option value='Albania'> Albania</option>
                    <option value='Algeria'> Algeria</option>
                    <option value='American Samoa'> American Samoa</option>
                    <option value='Andorra'> Andorra</option>
                    <option value='Angola'> Angola</option>
                    <option value='Anguilla'> Anguilla</option>
                    <option value='Antarctica'> Antarctica</option>
                    <option value='Antigua and Barbuda'> Antigua and Barbuda</option>
                    <option value='Argentina'> Argentina</option>
                    <option value='Armenia'> Armenia</option>
                    <option value='Aruba'> Aruba</option>
                    <option value='Australia'> Australia</option>
                    <option value='Austria'> Austria</option>
                    <option value='Azerbaijan'> Azerbaijan</option>
                    <option value='Bahamas (the)'> Bahamas (the)</option>
                    <option value='Bahrain'> Bahrain</option>
                    <option value='Bangladesh'> Bangladesh</option>
                    <option value='Barbados'> Barbados</option>
                    <option value='Belarus'> Belarus</option>
                    <option value='Belgium'> Belgium</option>
                    <option value='Belize'> Belize</option>
                    <option value='Benin'> Benin</option>
                    <option value='Bermuda'> Bermuda</option>
                    <option value='Bhutan'> Bhutan</option>
                    <option value='Bolivia (Plurinational State of)'> Bolivia (Plurinational State of)</option>
                    <option value='Bonaire, Sint Eustatius and Saba'> Bonaire, Sint Eustatius and Saba</option>
                    <option value='Bosnia and Herzegovina'> Bosnia and Herzegovina</option>
                    <option value='Botswana'> Botswana</option>
                    <option value='Bouvet Island'> Bouvet Island</option>
                    <option value='Brazil'> Brazil</option>
                    <option value='British Indian Ocean Territory (the)'> British Indian Ocean Territory (the)</option>
                    <option value='Brunei Darussalam'> Brunei Darussalam</option>
                    <option value='Bulgaria'> Bulgaria</option>
                    <option value='Burkina Faso'> Burkina Faso</option>
                    <option value='Burundi'> Burundi</option>
                    <option value='Cabo Verde'> Cabo Verde</option>
                    <option value='Cambodia'> Cambodia</option>
                    <option value='Cameroon'> Cameroon</option>
                    <option value='Canada'> Canada</option>
                    <option value='Cayman Islands (the)'> Cayman Islands (the)</option>
                    <option value='Central African Republic (the)'> Central African Republic (the)</option>
                    <option value='Chad'> Chad</option>
                    <option value='Chile'> Chile</option>
                    <option value='China'> China</option>
                    <option value='Christmas Island'> Christmas Island</option>
                    <option value='Cocos (Keeling) Islands (the)'> Cocos (Keeling) Islands (the)</option>
                    <option value='Colombia'> Colombia</option>
                    <option value='Comoros (the)'> Comoros (the)</option>
                    <option value='Congo (the Democratic Republic of the)'> Congo (the Democratic Republic of the)</option>
                    <option value='Congo (the)'> Congo (the)</option>
                    <option value='Cook Islands (the)'> Cook Islands (the)</option>
                    <option value='Costa Rica'> Costa Rica</option>
                    <option value='Croatia'> Croatia</option>
                    <option value='Cuba'> Cuba</option>
                    <option value='Curaçao'> Curaçao</option>
                    <option value='Cyprus'> Cyprus</option>
                    <option value='Czechia'> Czechia</option>
                    <option value="Côte d' Ivoire"> Côte d'Ivoire</option>
                    <option value='Denmark'> Denmark</option>
                    <option value='Djibouti'> Djibouti</option>
                    <option value='Dominica'> Dominica</option>
                    <option value='Dominican Republic (the)'> Dominican Republic (the)</option>
                    <option value='Ecuador'> Ecuador</option>
                    <option value='Egypt'> Egypt</option>
                    <option value='El Salvador'> El Salvador</option>
                    <option value='Equatorial Guinea'> Equatorial Guinea</option>
                    <option value='Eritrea'> Eritrea</option>
                    <option value='Estonia'> Estonia</option>
                    <option value='Eswatini'> Eswatini</option>
                    <option value='Ethiopia'> Ethiopia</option>
                    <option value='Falkland Islands (the) [Malvinas]'> Falkland Islands (the) [Malvinas]</option>
                    <option value='Faroe Islands (the)'> Faroe Islands (the)</option>
                    <option value='Fiji'> Fiji</option>
                    <option value='Finland'> Finland</option>
                    <option value='France'> France</option>
                    <option value='French Guiana'> French Guiana</option>
                    <option value='French Polynesia'> French Polynesia</option>
                    <option value='French Southern Territories (the)'> French Southern Territories (the)</option>
                    <option value='Gabon'> Gabon</option>
                    <option value='Gambia (the)'> Gambia (the)</option>
                    <option value='Georgia'> Georgia</option>
                    <option value='Germany'> Germany</option>
                    <option value='Ghana'> Ghana</option>
                    <option value='Gibraltar'> Gibraltar</option>
                    <option value='Greece'> Greece</option>
                    <option value='Greenland'> Greenland</option>
                    <option value='Grenada'> Grenada</option>
                    <option value='Guadeloupe'> Guadeloupe</option>
                    <option value='Guam'> Guam</option>
                    <option value='Guatemala'> Guatemala</option>
                    <option value='Guernsey'> Guernsey</option>
                    <option value='Guinea'> Guinea</option>
                    <option value='Guinea-Bissau'> Guinea-Bissau</option>
                    <option value='Guyana'> Guyana</option>
                    <option value='Haiti'> Haiti</option>
                    <option value='Heard Island and McDonald Islands'> Heard Island and McDonald Islands</option>
                    <option value='Holy See (the)'> Holy See (the)</option>
                    <option value='Honduras'> Honduras</option>
                    <option value='Hong Kong'> Hong Kong</option>
                    <option value='Hungary'> Hungary</option>
                    <option value='Iceland'> Iceland</option>
                    <option value='India'> India</option>
                    <option value='Indonesia'> Indonesia</option>
                    <option value='Iran (Islamic Republic of)'> Iran (Islamic Republic of)</option>
                    <option value='Iraq'> Iraq</option>
                    <option value='Ireland'> Ireland</option>
                    <option value='Isle of Man'> Isle of Man</option>
                    <option value='Israel'> Israel</option>
                    <option value='Italy'> Italy</option>
                    <option value='Jamaica'> Jamaica</option>
                    <option value='Japan'> Japan</option>
                    <option value='Jersey'> Jersey</option>
                    <option value='Jordan'> Jordan</option>
                    <option value='Kazakhstan'> Kazakhstan</option>
                    <option value='Kenya'> Kenya</option>
                    <option value='Kiribati'> Kiribati</option>
                    <option value="Korea (the Democratic People's Republic of)"> Korea (the Democratic People's Republic of)
                    </option>
                    <option value='Korea (the Republic of)'> Korea (the Republic of)</option>
                    <option value='Kuwait'> Kuwait</option>
                    <option value='Kyrgyzstan'> Kyrgyzstan</option>
                    <option value="Lao People' s Democratic Republic (the)"> Lao People's Democratic Republic (the)</option>
                    <option value='Latvia'> Latvia</option>
                    <option value='Lebanon'> Lebanon</option>
                    <option value='Lesotho'> Lesotho</option>
                    <option value='Liberia'> Liberia</option>
                    <option value='Libya'> Libya</option>
                    <option value='Liechtenstein'> Liechtenstein</option>
                    <option value='Lithuania'> Lithuania</option>
                    <option value='Luxembourg'> Luxembourg</option>
                    <option value='Macao'> Macao</option>
                    <option value='Madagascar'> Madagascar</option>
                    <option value='Malawi'> Malawi</option>
                    <option value='Malaysia'> Malaysia</option>
                    <option value='Maldives'> Maldives</option>
                    <option value='Mali'> Mali</option>
                    <option value='Malta'> Malta</option>
                    <option value='Marshall Islands (the)'> Marshall Islands (the)</option>
                    <option value='Martinique'> Martinique</option>
                    <option value='Mauritania'> Mauritania</option>
                    <option value='Mauritius'> Mauritius</option>
                    <option value='Mayotte'> Mayotte</option>
                    <option value='Mexico'> Mexico</option>
                    <option value='Micronesia (Federated States of)'> Micronesia (Federated States of)</option>
                    <option value='Moldova (the Republic of)'> Moldova (the Republic of)</option>
                    <option value='Monaco'> Monaco</option>
                    <option value='Mongolia'> Mongolia</option>
                    <option value='Montenegro'> Montenegro</option>
                    <option value='Montserrat'> Montserrat</option>
                    <option value='Morocco'> Morocco</option>
                    <option value='Mozambique'> Mozambique</option>
                    <option value='Myanmar'> Myanmar</option>
                    <option value='Namibia'> Namibia</option>
                    <option value='Nauru'> Nauru</option>
                    <option value='Nepal'> Nepal</option>
                    <option value='Netherlands (the)'> Netherlands (the)</option>
                    <option value='New Caledonia'> New Caledonia</option>
                    <option value='New Zealand'> New Zealand</option>
                    <option value='Nicaragua'> Nicaragua</option>
                    <option value='Niger (the)'> Niger (the)</option>
                    <option value='Nigeria'> Nigeria</option>
                    <option value='Niue'> Niue</option>
                    <option value='Norfolk Island'> Norfolk Island</option>
                    <option value='Northern Mariana Islands (the)'> Northern Mariana Islands (the)</option>
                    <option value='Norway'> Norway</option>
                    <option value='Oman'> Oman</option>
                    <option value='Pakistan'> Pakistan</option>
                    <option value='Palau'> Palau</option>
                    <option value='Palestine, State of'> Palestine, State of</option>
                    <option value='Panama'> Panama</option>
                    <option value='Papua New Guinea'> Papua New Guinea</option>
                    <option value='Paraguay'> Paraguay</option>
                    <option value='Peru'> Peru</option>
                    <option value='Philippines (the)'> Philippines (the)</option>
                    <option value='Pitcairn'> Pitcairn</option>
                    <option value='Poland'> Poland</option>
                    <option value='Portugal'> Portugal</option>
                    <option value='Puerto Rico'> Puerto Rico</option>
                    <option value='Qatar'> Qatar</option>
                    <option value='Republic of North Macedonia'> Republic of North Macedonia</option>
                    <option value='Romania'> Romania</option>
                    <option value='Russian Federation (the)'> Russian Federation (the)</option>
                    <option value='Rwanda'> Rwanda</option>
                    <option value='Réunion'> Réunion</option>
                    <option value='Saint Barthélemy'> Saint Barthélemy</option>
                    <option value='Saint Helena, Ascension and Tristan da Cunha'> Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value='Saint Kitts and Nevis'> Saint Kitts and Nevis</option>
                    <option value='Saint Lucia'> Saint Lucia</option>
                    <option value='Saint Martin (French part)'> Saint Martin (French part)</option>
                    <option value='Saint Pierre and Miquelon'> Saint Pierre and Miquelon</option>
                    <option value='Saint Vincent and the Grenadines'> Saint Vincent and the Grenadines</option>
                    <option value='Samoa'> Samoa</option>
                    <option value='San Marino'> San Marino</option>
                    <option value='Sao Tome and Principe'> Sao Tome and Principe</option>
                    <option value='Saudi Arabia'> Saudi Arabia</option>
                    <option value='Senegal'> Senegal</option>
                    <option value='Serbia'> Serbia</option>
                    <option value='Seychelles'> Seychelles</option>
                    <option value='Sierra Leone'> Sierra Leone</option>
                    <option value='Singapore'> Singapore</option>
                    <option value='Sint Maarten (Dutch part)'> Sint Maarten (Dutch part)</option>
                    <option value='Slovakia'> Slovakia</option>
                    <option value='Slovenia'> Slovenia</option>
                    <option value='Solomon Islands'> Solomon Islands</option>
                    <option value='Somalia'> Somalia</option>
                    <option value='South Africa'> South Africa</option>
                    <option value='South Georgia and the South Sandwich Islands'> South Georgia and the South Sandwich Islands
                    </option>
                    <option value='South Sudan'> South Sudan</option>
                    <option value='Spain'> Spain</option>
                    <option value='Sri Lanka'> Sri Lanka</option>
                    <option value='Sudan (the)'> Sudan (the)</option>
                    <option value='Suriname'> Suriname</option>
                    <option value='Svalbard and Jan Mayen'> Svalbard and Jan Mayen</option>
                    <option value='Sweden'> Sweden</option>
                    <option value='Switzerland'> Switzerland</option>
                    <option value='Syrian Arab Republic'> Syrian Arab Republic</option>
                    <option value='Taiwan (Province of China)'> Taiwan (Province of China)</option>
                    <option value='Tajikistan'> Tajikistan</option>
                    <option value='Tanzania, United Republic of'> Tanzania, United Republic of</option>
                    <option value='Thailand'> Thailand</option>
                    <option value='Timor-Leste'> Timor-Leste</option>
                    <option value='Togo'> Togo</option>
                    <option value='Tokelau'> Tokelau</option>
                    <option value='Tonga'> Tonga</option>
                    <option value='Trinidad and Tobago'> Trinidad and Tobago</option>
                    <option value='Tunisia'> Tunisia</option>
                    <option value='Turkey'> Turkey</option>
                    <option value='Turkmenistan'> Turkmenistan</option>
                    <option value='Turks and Caicos Islands (the)'> Turks and Caicos Islands (the)</option>
                    <option value='Tuvalu'> Tuvalu</option>
                    <option value='Uganda'> Uganda</option>
                    <option value='Ukraine'> Ukraine</option>
                    <option value='United Arab Emirates (the)'> United Arab Emirates (the)</option>
                    <option value='United Kingdom of Great Britain and Northern Ireland (the)'> United Kingdom of Great
                      Britain and Northern Ireland (the)</option>
                    <option value='United States Minor Outlying Islands (the)'> United States Minor Outlying Islands (the)
                    </option>
                    <option value='United States of America (the)'> United States of America (the)</option>
                    <option value='Uruguay'> Uruguay</option>
                    <option value='Uzbekistan'> Uzbekistan</option>
                    <option value='Vanuatu'> Vanuatu</option>
                    <option value='Venezuela (Bolivarian Republic of)'> Venezuela (Bolivarian Republic of)</option>
                    <option value='Viet Nam'> Viet Nam</option>
                    <option value='Virgin Islands (British)'> Virgin Islands (British)</option>
                    <option value='Virgin Islands (U.S.)'> Virgin Islands (U.S.)</option>
                    <option value='Wallis and Futuna'> Wallis and Futuna</option>
                    <option value='Western Sahara'> Western Sahara</option>
                    <option value='Yemen'> Yemen</option>
                    <option value='Zambia'> Zambia</option>
                    <option value='Zimbabwe'> Zimbabwe</option>
                    <option value='Åland Islands'> Åland Islands</option>

                  </select>
                  <div className="titleform">
                    <label>Date of Birth</label>
                  </div>
                  <div id="colls3wrapper">
                    <div id="colls3form" className="coll1month">
                      <select name="month">
                        <option value="0">Month</option>
                        <option value='January'> January</option>
                        <option value='February'> February</option>
                        <option value='March'> March</option>
                        <option value='April'> April</option>
                        <option value='May'> May</option>
                        <option value='June'> June</option>
                        <option value='July'> July</option>
                        <option value='August'> August</option>
                        <option value='September'> September</option>
                        <option value='October'> October</option>
                        <option value='November'> November</option>
                        <option value='December'> December</option>
                      </select>
                    </div>
                    <div id="colls3form" className="day">
                      <select name="day">
                        <option value="0">Day</option>
                        <option value='1'> 1 </option>
                        <option value='2'> 2 </option>
                        <option value='3'> 3 </option>
                        <option value='4'> 4 </option>
                        <option value='5'> 5 </option>
                        <option value='6'> 6 </option>
                        <option value='7'> 7 </option>
                        <option value='8'> 8 </option>
                        <option value='9'> 9 </option>
                        <option value='10'> 10 </option>
                        <option value='11'> 11 </option>
                        <option value='12'> 12 </option>
                        <option value='13'> 13 </option>
                        <option value='14'> 14 </option>
                        <option value='15'> 15 </option>
                        <option value='16'> 16 </option>
                        <option value='17'> 17 </option>
                        <option value='18'> 18 </option>
                        <option value='19'> 19 </option>
                        <option value='20'> 20 </option>
                        <option value='21'> 21 </option>
                        <option value='22'> 22 </option>
                        <option value='23'> 23 </option>
                        <option value='24'> 24 </option>
                        <option value='25'> 25 </option>
                        <option value='26'> 26 </option>
                        <option value='27'> 27 </option>
                        <option value='28'> 28 </option>
                        <option value='29'> 29 </option>
                        <option value='30'> 30 </option>
                        <option value='31'> 31 </option>
                      </select>
                    </div>
                    <div id="colls3form" className="year">
                      <select name="year">
                        <option value="0">Year</option>

                        <option value='1945'> 1945 </option>
                        <option value='1946'> 1946 </option>
                        <option value='1947'> 1947 </option>
                        <option value='1948'> 1948 </option>
                        <option value='1949'> 1949 </option>
                        <option value='1950'> 1950 </option>
                        <option value='1951'> 1951 </option>
                        <option value='1952'> 1952 </option>
                        <option value='1953'> 1953 </option>
                        <option value='1954'> 1954 </option>
                        <option value='1955'> 1955 </option>
                        <option value='1956'> 1956 </option>
                        <option value='1957'> 1957 </option>
                        <option value='1958'> 1958 </option>
                        <option value='1959'> 1959 </option>
                        <option value='1960'> 1960 </option>
                        <option value='1961'> 1961 </option>
                        <option value='1962'> 1962 </option>
                        <option value='1963'> 1963 </option>
                        <option value='1964'> 1964 </option>
                        <option value='1965'> 1965 </option>
                        <option value='1966'> 1966 </option>
                        <option value='1967'> 1967 </option>
                        <option value='1968'> 1968 </option>
                        <option value='1969'> 1969 </option>
                        <option value='1970'> 1970 </option>
                        <option value='1971'> 1971 </option>
                        <option value='1972'> 1972 </option>
                        <option value='1973'> 1973 </option>
                        <option value='1974'> 1974 </option>
                        <option value='1975'> 1975 </option>
                        <option value='1976'> 1976 </option>
                        <option value='1977'> 1977 </option>
                        <option value='1978'> 1978 </option>
                        <option value='1979'> 1979 </option>
                        <option value='1980'> 1980 </option>
                        <option value='1981'> 1981 </option>
                        <option value='1982'> 1982 </option>
                        <option value='1983'> 1983 </option>
                        <option value='1984'> 1984 </option>
                        <option value='1985'> 1985 </option>
                        <option value='1986'> 1986 </option>
                        <option value='1987'> 1987 </option>
                        <option value='1988'> 1988 </option>
                        <option value='1989'> 1989 </option>
                        <option value='1990'> 1990 </option>
                        <option value='1991'> 1991 </option>
                        <option value='1992'> 1992 </option>
                        <option value='1993'> 1993 </option>
                        <option value='1994'> 1994 </option>
                        <option value='1995'> 1995 </option>
                        <option value='1996'> 1996 </option>
                        <option value='1997'> 1997 </option>
                        <option value='1998'> 1998 </option>
                        <option value='1999'> 1999 </option>
                        <option value='2000'> 2000 </option>
                        <option value='2001'> 2001 </option>
                        <option value='2002'> 2002 </option>
                        <option value='2003'> 2003 </option>
                        <option value='2004'> 2004 </option>
                        <option value='2005'> 2005 </option>
                        <option value='2006'> 2006 </option>
                        <option value='2007'> 2007 </option>
                        <option value='2008'> 2008 </option>
                        <option value='2009'> 2009 </option>
                        <option value='2010'> 2010 </option>
                        <option value='2011'> 2011 </option>
                        <option value='2012'> 2012 </option>
                        <option value='2013'> 2013 </option>
                        <option value='2014'> 2014 </option>
                        <option value='2015'> 2015 </option>
                        <option value='2016'> 2016 </option>
                        <option value='2017'> 2017 </option>
                        <option value='2018'> 2018 </option>
                        <option value='2019'> 2019 </option>
                        <option value='2020'> 2020 </option>
                        <option value='2021'> 2021 </option>
                      </select>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="titleform">
                    <label>Social Media Accounts (optional)</label>
                  </div>
                  <div id="colls2wrapper">
                    <div id="colls2form">
                      <input type="text" name="twitter" placeholder="Twitter">
                    </div>
                    <div id="colls2form" className="lastcoll">
                      <input type="text" name="instagram" placeholder="Instagram">
                    </div>
                    <div id="colls2form">
                      <input type="text" name="onlyfans" placeholder="OnlyFans">
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div id="consentarea">
                    <input type="radio" name="consent"
                      value="By checking this box, you certify that you are above 18 years of age."><label>By checking this
                      box, you certify that you are above 18 years of age.</label>
                  </div>
                  <div id="submitbtn">
                    <input type="submit" name="submitBtn" value="Submit">
                  </div>
                </form>
              </div>

            </div>
          </div>

          <main>
            <div id="hero">
              <div className="containersite_cuminu">
                <div id="middlehero">
                  <img style="width: 40px; height: 40px; object-fit: contain" src="img/swap.png">
                  <h3>INTRODUCING CUMINU TOKEN <span className="smallletters">ERC-20</span></h3>
                  <h1 className="desktopview">The token that<br />powers the <span
                      className="typewriter-text">cummuniti</span><br />platform.</h1>

                  <h1 className="mobileview">The token that powers the <span className="typewriter-text">cummuniti</span> platform.
                  </h1>
                  <p>Join us as we <span>revolutionize</span> adult entertainment forever.</p>
                  <a className="swap-btn" target="_blank" href="swap/index.html">BUY NOW</a>
                </div>
                {/* <!--end middle hero--> */}
              </div>
              {/* <!--end container--> */}
            </div>
            {/* <!--end hero--> */}
            <div id="statistics">
              <div className="containersite_cuminu">
                <div id="middlestats">
                  <div className="stats">
                    <div className="list-stat">
                      <h3>LATEST PRICE</h3>
                      <h4 id="price">$0.00</h4>
                    </div>
                    {/* <!--end list stat--> */}
                    <div className="list-stat">
                      <h3>TOTAL SUPPLY</h3>
                      <h4 id="total_supply">0.00</h4>
                    </div>
                    {/* <!--end list stat--> */}
                    <div className="list-stat">
                      <h3>TOTAL HOLDERS</h3>
                      <h4 id="total_holders">0</h4>
                    </div>
                    {/* <!--end list stat--> */}
                    <div className="list-stat">
                      <h3>MARKET CAP</h3>
                      <h4 id="market_cap">$0.00</h4>
                    </div>
                    {/* <!--end list stat--> */}
                  </div>

                  <div id="buttonscentered">
                    <a href="https://www.dextools.io/app/uniswap/pair-explorer/0x7b412f141996411401f57e2ba1bc2235af807d4d"
                      target="_blank" id="livechartbtn" style=" align-items: center;"> <img
                        style="width: 40px; height: 40px; object-fit: contain position: relative; top: .8rem;"
                        src="img/chart.png">LIVE CHART</a>

                    <a href="https://etherscan.io/address/0xd6327ce1fb9D6020E8C2c0E124A1eC23DCAb7536" target="_blank"
                      id="etherscanicn"> <img
                        style="width: 40px; height: 40px; object-fit: contain position: relative; top: .8rem"
                        src="img/etherscan.png">ETHERSCAN</a>
                  </div>
                  {/* <!--end buttons statistics--> */}

                  <div id="statistics_text">
                    <h3 id="total_burned">1 <img className="perma_burned" src="img/swap.png"> </h3>
                    <h4>PERMANENTLY REMOVED</h4>
                    <p>Once our tokens are burned, they will no<br />
                      longer appear in any wallet, dead or otherwise.</p>
                  </div>
                </div>
                {/* <!-- end statistics text- --> */}
              </div>
              {/* <!--end middle--> */}
            </div>
            {/* <!--end statistics--> */}
            <div id="tokenomics">
              <div className="containersite_cuminu">
                <div id="middletokenomics">
                  <img style="width: 40px; height: 40px; object-fit: contain" src="img/dual-chain.png">
                  <h3>FIRST-OF-ITS-KIND</h3>
                  <h2>Dual-Chain Tokenomics</h2>
                  <p>We have developed a first-of-its-kind <span>cross-chain burn mechanism</span> that utilizes both the
                    Ethereum and Binance blockchains.</p>
                  <a target="_blank" href="dual-chain.pdf">READ MORE</a>
                </div>
                {/* <!--end middle tokenomics--> */}
              </div>
            </div>
            {/* <!--end tokenomics--> */}

            <div id="introtipinu">
              <div className="containersite_cuminu">
                <img style="width: 40px; height: 40px; object-fit: contain" src="img/tipinu.png">
                <h3>INTRODUCING TIPINU TOKEN <span className="smallletters">BEP-20</span></h3>
                <h2>The tipping currency<br />of the platform</h2>
                <p>If CUMINU is the engine of the ecosystem, TIPINU is the rocket fuel.</p>
                <a href="#">TIPINU STATISTICS</a>
              </div>
            </div>
            {/* <!--end intro tipinu--> */}

            <div id="jointhecuminu">
              <div className="containersite_cuminu">
                <div id="middletokenomics">
                  <img style="width: 40px; height: 40px; object-fit: contain" src="img/swap.png">
                  <h3>JOIN THE CUMMUNITI</h3>
                  <h2>Get a first-class seat on the <span>cummuniti</span> platform.</h2>
                  <p className="show1920">Enjoy exclusive benefits on our next-generation 18+ streaming platform by holding CUMINU
                    token.</p>

                  <p className="show1200">Enjoy exclusive benefits on our next-generation 18+ streaming platform by holding CUMINU
                    token.</p>

                  <p className="show700">Enjoy exclusive benefits on our next-generation 18+ streaming platform by holding CUMINU
                    token.</p>

                  <a href="#">VISIT THE PLATFORM</a>

                </div>
              </div>
            </div>
            {/* <!--end join the cuminu--> */}

            <div id="roadmaparea">
              <div className="containersite_cuminu">
                <div id="middletokenomics">
                  <h2>Ecosystem Roadmap</h2>
                  <div className="roadmaplist">
                    <h3>Launch <span>COMPLETED</span></h3>
                    <ul>
                      <li>Create Ethereum Contract</li>
                      <li>Liquidity Lock</li>
                      <li>Pair on UniSwap</li>
                      <li>Website Launch</li>
                      <li>CoinMarketCap Listing</li>
                      <li>CoinGecko Listing</li>
                      <li>Socials and Branding</li>
                      <li>1500 Wallet Holders</li>
                      <li>$10 Million Valuation</li>
                    </ul>

                  </div>
                  {/* <!--end roadmap list--> */}

                  <div className="roadmaplist">
                    <h3>Growth <span>IN PROGRESS</span></h3>
                    <ul>
                      <li>First AMA with Tasha Reign</li>
                      <li>V1 Platform BETA</li>
                      <li>Solidity Audit</li>
                      <li>Ecosystem Rebrand</li>
                      <li><span>cummuniti</span> Concept</li>
                      <li>Recruitment</li>
                      <li className="graycolor">10,000 Wallet Holders</li>
                      <li className="graycolor">$100M Valuation</li>
                      <li className="graycolor">New CUMINU Website Launch</li>
                    </ul>

                  </div>
                  {/* <!--end roadmap list--> */}

                  <div className="roadmaplist">
                    <h3>Utility</h3>
                    <ul>
                      <li className="graycolor">Launch <span>cummuniti</span> Platform</li>
                      <li className="graycolor">Major Marketing Campaign</li>
                      <li className="graycolor">First CUMINU Buyback</li>
                      <li className="graycolor">25,000 Wallet Holders</li>
                      <li className="graycolor">$500M Valuation</li>
                      <li className="graycolor">1000 Creators (Passed KYC)</li>
                      <li className="graycolor">10,000 Platform Users</li>
                      <li className="graycolor">$First $10M in Platform Revenue</li>
                    </ul>
                  </div>
                </div>
                {/* <!--end roadmap list--> */}

              </div>

            </div>
            {/* <!--end join the cuminu--> */}

          </main>

        </div>

        <footer>
          <div class="containersite_cuminu">
            <div id="socialmedia">
              <h3>FOLLOW US ON</h3>
              <h2>Social Media</h2>
              <p>For the latest updates on all things CUMINU. Never miss a beat again.</p>
              <ul>
                <li><img class="socials" src="img/telegram.png"> <span><a href="https://t.me/CumInuToken"
                      target="_blank">Visit CUMINU Telegram</a></span></li>

                <li><img class="socials" src="img/twitter.png"> <span><a href="https://twitter.com/CumInuToken"
                      target="_blank">Visit CUMINU Twitter</a></span></li>

              </ul>
            </div>
          </div>

        </footer>
        <!--end footer-->

        <div id="fixedsocialmedia">
          <ul id="customfontsharefixed">
            <li><a id="telegramcstma" href="https://t.me/CumInuToken" target="_blank"><i
                  class="fab fa-telegram-plane"></i></a></li>

            <li><a id="twittercstma" href="https://twitter.com/CumInuToken" target="_blank"><i class="fab fa-twitter"></i></a>
            </li>
          </ul>
        </div>

        <div id="backtotoparea">
          <ul>
            <li><a href="#wrapper_cuminu"><i class="fas fa-arrow-up"></i></a></li>
          </ul>
        </div>

        <script src="scripts/live_feed.js"> </script>
        <script src="scripts/form.js"> </script>
      </div>

    </SidebarLayout>

  )
}

export default LandingPage