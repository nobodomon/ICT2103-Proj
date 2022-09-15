import React from "react";
import "../styles/Hamburger.scss";
import footer from "../Assets/footer.png";
import { Link } from "react-router-dom";
import { searchSuggestions } from "../Pages/PageLayout";

export class DivSpacing extends React.Component {
    state = {
        spacing: 1
    }
    render() {
        return (
            <div className={"divSpacing-" + this.state.spacing}></div>
        )
    }
}

export class SizedBox extends React.Component {
    render() {
        const width = this.props.width;
        const height = this.props.height;
        return (
            <div style={{ width: width, height: height }} className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}
SizedBox.defaultProps = {
    width: "0px",
    height: "0px"
}

const clips = [
    { clipPath: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)" },
    { clipPath: "circle(100% at 0 0)" },
    { clipPath: "circle(100% at 100% 0)" },
    { clipPath: "circle(100% at 0 100%)" },
    { clipPath: "circle(100% at 100% 100%)" },
    { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
]
export class AnimatedBackGround extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animationDelayTL: Math.random() * 10 + 's',
            animationDurationTL: Math.random() * 10 + 's',
            animationDelayTR: Math.random() * 10 + 's',
            animationDurationTR: Math.random() * 10 + 's',
        }
        this.reset = this.reset.bind(this);
    }
    reset = (pos) => {
        switch (pos) {
            case "topleft": {
                this.setState({
                    animationDelayTL: Math.random() * 10 + 's',
                    animationDurationTL: Math.random() * 10 + 's',
                })
            }
                break;
            case "topright": {
                this.setState({
                    animationDelayTR: Math.random() * 10 + 's',
                    animationDurationTR: Math.random() * 10 + 's',
                })
            }
                break;

        }
    }
    render() {
        return (
            <div className="animatedBackGround">
            </div>
        )
    }
}

export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCopyright: true
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }
    resize() {
        if (window.innerWidth <= 576) {
            this.setState({
                showCopyright: false
            }
            )
        } else {
            this.setState({
                showCopyright: true
            }
            )
        }
    }
    render() {
        return (
            <div className="footer">
                <div className="footer-content">
                    {this.state.showCopyright &&
                        <div className="footer-text no-print">Copyright &copy; 2022 Chimeric Technologies. All Rights Reserved.</div>
                    }
                    <img className="footer-Logo" src={footer}></img>
                </div>
            </div>
        )
    }
}

export class StdInputDropDownOption extends React.Component {
    render() {
        return (
            <div className={"dropdownOptions" + " " + this.props.className} type={this.props.type} value={this.props.value} onClick={this.props.onClick}>

                {this.props.children}
            </div>
        )
    }
}

export class StdInputCountryCodeDropDownOption extends React.Component {
    render() {
        return (
            <div className={"dropdownOptions "} value={this.props.value} onClick={this.props.onClick}>
                <span className="countryCode">{this.props.countryCode}</span>
                {this.props.children}
            </div>
        )
    }
}
StdInputDropDownOption.defaultProps = {
    value: "",
}

// List of all potential country phone number code and their flag unicodes
const telCodes = [
    { value: "+1", label: "(+1) USA", countryCode: "🇺🇸" },
    { value: "+7", label: "(+7) Russia", countryCode: "🇷🇺" },
    { value: "+20", label: "(+20) Egypt", countryCode: "🇪🇬" },
    { value: "+27", label: "(+27) South Africa", countryCode: "🇿🇦" },
    { value: "+30", label: "(+30) Greece", countryCode: "🇬🇷" },
    { value: "+31", label: "(+31) Netherlands", countryCode: "🇳🇱" },
    { value: "+32", label: "(+32) Belgium", countryCode: "🇧🇪" },
    { value: "+33", label: "(+33) France", countryCode: "🇫🇷" },
    { value: "+34", label: "(+34) Spain", countryCode: "🇪🇸" },
    { value: "+36", label: "(+36) Hungary", countryCode: "🇭🇺" },
    { value: "+39", label: "(+39) Italy", countryCode: "🇮🇹" },
    { value: "+40", label: "(+40) Romania", countryCode: "🇷🇴" },
    { value: "+41", label: "(+41) Switzerland", countryCode: "🇨🇭" },
    { value: "+43", label: "(+43) Austria", countryCode: "🇦🇹" },
    { value: "+44", label: "(+44) United Kingdom", countryCode: "🇬🇧" },
    { value: "+45", label: "(+45) Denmark", countryCode: "🇩🇰" },
    { value: "+46", label: "(+46) Sweden", countryCode: "🇸🇪" },
    { value: "+47", label: "(+47) Norway", countryCode: "🇳🇴" },
    { value: "+48", label: "(+48) Poland", countryCode: "🇵🇱" },
    { value: "+49", label: "(+49) Germany", countryCode: "🇩🇪" },
    { value: "+51", label: "(+51) Brazil", countryCode: "🇧🇷" },
    { value: "+52", label: "(+52) Mexico", countryCode: "🇲🇽" },
    { value: "+53", label: "(+53) Cuba", countryCode: "🇨🇵" },
    { value: "+54", label: "(+54) Argentina", countryCode: "🇦🇷" },
    { value: "+55", label: "(+55) Brazil", countryCode: "🇧🇷" },
    { value: "+56", label: "(+56) Chile", countryCode: "🇨🇱" },
    { value: "+57", label: "(+57) Colombia", countryCode: "🇨🇴" },
    { value: "+58", label: "(+58) Venezuela", countryCode: "🇻🇪" },
    { value: "+60", label: "(+60) Malaysia", countryCode: "🇲🇾" },
    { value: "+61", label: "(+61) Australia", countryCode: "🇦🇺" },
    { value: "+64", label: "(+64) New Zealand", countryCode: "🇳🇿" },
    { value: "+65", label: "(+65) Singapore", countryCode: "🇸🇬" },
    { value: "+66", label: "(+66) Thailand", countryCode: "🇹🇭" },
    { value: "+81", label: "(+81) Japan", countryCode: "🇯🇵" },
    { value: "+82", label: "(+82) South Korea", countryCode: "🇰🇷" },
    { value: "+84", label: "(+84) Vietnam", countryCode: "🇻🇳" },
    { value: "+86", label: "(+86) China", countryCode: "🇨🇳" },
    { value: "+90", label: "(+90) Turkey", countryCode: "🇹🇷" },
    { value: "+91", label: "(+91) India", countryCode: "🇮🇳" },
    { value: "+92", label: "(+92) Pakistan", countryCode: "🇵🇰" },
    { value: "+93", label: "(+93) Afghanistan", countryCode: "🇦🇫" },
    { value: "+94", label: "(+94) Sri Lanka", countryCode: "🇱🇰" },
    { value: "+95", label: "(+95) Myanmar", countryCode: "🇲🇲" },
    { value: "+98", label: "(+98) Iran", countryCode: "🇮🇷" },
    { value: "+211", label: "(+211) South Sudan", countryCode: "🇸🇩" },
    { value: "+212", label: "(+212) Morocco", countryCode: "🇲🇦" },
    { value: "+213", label: "(+213) Algeria", countryCode: "🇩🇿" },
    { value: "+216", label: "(+216) Tunisia", countryCode: "🇹🇳" },
    { value: "+218", label: "(+218) Libya", countryCode: "🇱🇮" },
    { value: "+220", label: "(+220) Gambia", countryCode: "🇬🇲" },
    { value: "+221", label: "(+221) Senegal", countryCode: "🇸🇳" },
    { value: "+222", label: "(+222) Mauritania", countryCode: "🇲🇷" },
    { value: "+223", label: "(+223) Mali", countryCode: "🇲🇱" },
    { value: "+224", label: "(+224) Guinea", countryCode: "🇬🇳" },
    { value: "+225", label: "(+225) Côte d'Ivoire", countryCode: "🇨🇮" },
    { value: "+226", label: "(+226) Burkina Faso", countryCode: "🇧🇫" },
    { value: "+227", label: "(+227) Niger", countryCode: "🇳🇪" },
    { value: "+228", label: "(+228) Togo", countryCode: "🇹🇬" },
    { value: "+229", label: "(+229) Benin", countryCode: "🇧🇯" },
    { value: "+230", label: "(+230) Mauritius", countryCode: "🇲🇺" },
    { value: "+231", label: "(+231) Liberia", countryCode: "🇱🇷" },
    { value: "+232", label: "(+232) Sierra Leone", countryCode: "🇸🇱" },
    { value: "+233", label: "(+233) Ghana", countryCode: "🇬🇭" },
    { value: "+234", label: "(+234) Nigeria", countryCode: "🇳🇦" },
    { value: "+235", label: "(+235) Chad", countryCode: "🇹🇩" },
    { value: "+236", label: "(+236) Central African Republic", countryCode: "🇨🇫" },
    { value: "+237", label: "(+237) Cameroon", countryCode: "🇨🇲" },
    { value: "+238", label: "(+238) Cape Verde", countryCode: "🇨🇻" },
    { value: "+239", label: "(+239) Sao Tome and Principe", countryCode: "🇸🇹" },
    { value: "+240", label: "(+240) Equatorial Guinea", countryCode: "🇬🇶" },
    { value: "+241", label: "(+241) Gabon", countryCode: "🇬🇫" },
    { value: "+242", label: "(+242) Congo", countryCode: "🇨🇬" },
    { value: "+243", label: "(+243) Democratic Republic of the Congo", countryCode: "🇨🇩" },
    { value: "+244", label: "(+244) Angola", countryCode: "🇦🇴" },
    { value: "+245", label: "(+245) Guinea-Bissau", countryCode: "🇬🇷" },
    { value: "+246", label: "(+246) Diego Garcia", countryCode: "🇩🇬" },
    { value: "+247", label: "(+247) Ascension Island", countryCode: "🇦🇨" },
    { value: "+248", label: "(+248) Seychelles", countryCode: "🇸🇨" },
    { value: "+249", label: "(+249) Sudan", countryCode: "🇸🇩" },
    { value: "+250", label: "(+250) Rwanda", countryCode: "🇷🇼" },
    { value: "+251", label: "(+251) Ethiopia", countryCode: "🇪🇹" },
    { value: "+252", label: "(+252) Somali", countryCode: "🇸🇲" },
    { value: "+253", label: "(+253) Djibouti", countryCode: "🇩🇯" },
    { value: "+254", label: "(+254) Kenya", countryCode: "🇰🇪" },
    { value: "+255", label: "(+255) Tanzania", countryCode: "🇹🇿" },
    { value: "+256", label: "(+256) Uganda", countryCode: "🇺🇬" },
    { value: "+257", label: "(+257) Burundi", countryCode: "🇧🇮" },
    { value: "+258", label: "(+258) Mozambique", countryCode: "🇲🇿" },
    { value: "+260", label: "(+260) Zambia", countryCode: "🇿🇲" },
    { value: "+261", label: "(+261) Madagascar", countryCode: "🇲🇬" },
    { value: "+263", label: "(+263) Zimbabwe", countryCode: "🇿🇲" },
    { value: "+264", label: "(+264) Namibia", countryCode: "🇳🇦" },
    { value: "+265", label: "(+265) Malawi", countryCode: "🇲🇼" },
    { value: "+266", label: "(+266) Lesotho", countryCode: "🇱🇸" },
    { value: "+267", label: "(+267) Botswana", countryCode: "🇧🇼" },
    { value: "+268", label: "(+268) Swaziland", countryCode: "🇸🇿" },
    { value: "+269", label: "(+269) Comoros", countryCode: "🇰🇲" },
    { value: "+290", label: "(+290) Saint Helena", countryCode: "🇸🇭" },
    { value: "+291", label: "(+291) Eritrea", countryCode: "🇪🇷" },
    { value: "+297", label: "(+297) Aruba", countryCode: "🇦🇼" },
    { value: "+298", label: "(+298) Faroe Islands", countryCode: "🇫🇴" },
    { value: "+299", label: "(+299) Greenland", countryCode: "🇬🇱" },
    { value: "+350", label: "(+350) Gibraltar", countryCode: "🇬🇬" },
    { value: "+351", label: "(+351) Portugal", countryCode: "🇵🇹" },
    { value: "+352", label: "(+352) Luxembourg", countryCode: "🇱🇺" },
    { value: "+353", label: "(+353) Ireland", countryCode: "🇮🇪" },
    { value: "+354", label: "(+354) Iceland", countryCode: "🇮🇸" },
    { value: "+355", label: "(+355) Albania", countryCode: "🇦🇱" },
    { value: "+356", label: "(+356) Malta", countryCode: "🇲🇹" },
    { value: "+357", label: "(+357) Cyprus", countryCode: "🇨🇾" },
    { value: "+358", label: "(+358) Finland", countryCode: "🇫🇮" },
    { value: "+359", label: "(+359) Bulgaria", countryCode: "🇧🇾" },
    { value: "+370", label: "(+370) Lithuania", countryCode: "🇱🇹" },
    { value: "+371", label: "(+371) Latvia", countryCode: "🇱🇻" },
    { value: "+372", label: "(+372) Estonia", countryCode: "🇪🇪" },
    { value: "+373", label: "(+373) Moldova", countryCode: "🇲🇩" },
    { value: "+374", label: "(+374) Armenia", countryCode: "🇦🇲" },
    { value: "+375", label: "(+375) Belarus", countryCode: "🇧🇾" },
    { value: "+376", label: "(+376) Andorra", countryCode: "🇦🇩" },
    { value: "+377", label: "(+377) Monaco", countryCode: "🇲🇨" },
    { value: "+378", label: "(+378) San Marino", countryCode: "🇸🇲" },
    { value: "+379", label: "(+379) Vatican City", countryCode: "🇻🇦" },
    { value: "+380", label: "(+380) Ukraine", countryCode: "🇺🇦" },
    { value: "+381", label: "(+381) Serbia", countryCode: "🇷🇸" },
    { value: "+382", label: "(+382) Montenegro", countryCode: "🇲🇪" },
    { value: "+385", label: "(+385) Croatia", countryCode: "🇭🇷" },
    { value: "+386", label: "(+386) Slovenia", countryCode: "🇸🇮" },
    { value: "+387", label: "(+387) Bosnia and Herzegovina", countryCode: "🇧🇦" },
    { value: "+389", label: "(+389) Macedonia", countryCode: "🇲🇰" },
    { value: "+420", label: "(+420) Czech Republic", countryCode: "🇨🇿" },
    { value: "+421", label: "(+421) Slovakia", countryCode: "🇸🇰" },
    { value: "+423", label: "(+423)Liechtenstein", countryCode: "🇱🇮" },
    { value: "+500", label: "(+500) Falkland Islands", countryCode: "🇫🇰" },
    { value: "+501", label: "(+501) Belize", countryCode: "🇲🇿" },
    { value: "+502", label: "(+502) Guatemala", countryCode: "🇬🇹" },
    { value: "+503", label: "(+503) El Salvador", countryCode: "🇸🇻" },
    { value: "+504", label: "(+504) Honduras", countryCode: "🇭🇳" },
    { value: "+505", label: "(+505) Nicaragua", countryCode: "🇳🇮" },
    { value: "+506", label: "(+506) Costa Rica", countryCode: "🇨🇷" },
    { value: "+507", label: "(+507) Panama", countryCode: "🇵🇦" },
    { value: "+508", label: "(+508) Saint Pierre and Miquelon", countryCode: "🇵🇲" },
    { value: "+509", label: "(+509) Haiti", countryCode: "🇭🇹" },
    { value: "+590", label: "(+590) Saint Barthelemy", countryCode: "🇧🇱" },
    { value: "+591", label: "(+591) Bolivia", countryCode: "🇧🇴" },
    { value: "+593", label: "(+593) Ecuador", countryCode: "🇪🇨" },
    { value: "+594", label: "(+594) French Guiana", countryCode: "🇬🇫" },
    { value: "+595", label: "(+595) Paraguay", countryCode: "🇵🇾" },
    { value: "+596", label: "(+596) Martinique", countryCode: "🇲🇨" },
    { value: "+597", label: "(+597) Uruguay", countryCode: "🇺🇾" },
    { value: "+598", label: "(+598) Suriname", countryCode: "🇸🇲" },
    { value: "+599", label: "(+599) Greenland", countryCode: "🇬🇩" },
    { value: "+670", label: "(+670) Timor-Leste", countryCode: "🇹🇲" },
    { value: "+672", label: "(+672) Antartica", countryCode: "🇦🇶" },
    { value: "+673", label: "(+673) Brunei", countryCode: "🇧🇳" },
    { value: "+674", label: "(+674) Nauru", countryCode: "🇳🇷" },
    { value: "+675", label: "(+675) Papua New Guinea", countryCode: "🇵🇬" },
    { value: "+676", label: "(+676) Tonga", countryCode: "🇹🇬" },
    { value: "+677", label: "(+677) Solomon Islands", countryCode: "🇸🇧" },
    { value: "+678", label: "(+678) Vanuatu", countryCode: "🇻🇺" },
    { value: "+679", label: "(+679) Fiji", countryCode: "🇫🇯" },
    { value: "+680", label: "(+680) Palau", countryCode: "🇵🇼" },
    { value: "+681", label: "(+681) Wallis and Futuna", countryCode: "🇼🇫" },
    { value: "+682", label: "(+682) Cook Islands", countryCode: "🇨🇰" },
    { value: "+683", label: "(+683) Niue", countryCode: "🇳🇺" },
    { value: "+685", label: "(+685) Samoa", countryCode: "🇸🇲" },
    { value: "+686", label: "(+686) Kiribati", countryCode: "🇰🇮" },
    { value: "+687", label: "(+687) New Caledonia", countryCode: "🇨🇳" },
    { value: "+688", label: "(+688) Tuvalu", countryCode: "🇹🇻" },
    { value: "+689", label: "(+689) French Polynesia", countryCode: "🇵🇫" },
    { value: "+690", label: "(+690) Tokelau", countryCode: "🇹🇰" },
    { value: "+691", label: "(+691) Micronesia", countryCode: "🇲🇲" },
    { value: "+692", label: "(+692) Marshall Islands", countryCode: "🇲🇭" },
    { value: "+850", label: "(+850) North Korea", countryCode: "🇰🇵" },
    { value: "+852", label: "(+852) Hong Kong", countryCode: "🇭🇰" },
    { value: "+853", label: "(+853) Macau", countryCode: "🇲🇴" },
    { value: "+855", label: "(+855) Cambodia", countryCode: "🇨🇰" },
    { value: "+856", label: "(+856) Laos", countryCode: "🇱🇦" },
    { value: "+880", label: "(+880) Bangladesh", countryCode: "🇧🇬" },
    { value: "+886", label: "(+886) Taiwan", countryCode: "🇹🇼" },
    { value: "+960", label: "(+960) Maldives", countryCode: "🇲🇻" },
    { value: "+961", label: "(+961) Lebanon", countryCode: "🇱🇧" },
    { value: "+962", label: "(+962) Jordan", countryCode: "🇯🇴" },
    { value: "+963", label: "(+963) Syria", countryCode: "🇸🇾" },
    { value: "+964", label: "(+964) Iraq", countryCode: "🇮🇶" },
    { value: "+965", label: "(+965) Kuwait", countryCode: "🇭🇺" },
    { value: "+966", label: "(+966) Saudi Arabia", countryCode: "🇸🇩" },
    { value: "+967", label: "(+967) Yemen", countryCode: "🇾🇪" },
    { value: "+968", label: "(+968) Oman", countryCode: "🇴🇲" },
    { value: "+970", label: "(+970) Palestinian Territory", countryCode: "🇵🇸" },
    { value: "+971", label: "(+971) United Arab Emirates", countryCode: "🇦🇪" },
    { value: "+972", label: "(+972) Israel", countryCode: "🇮🇱" },
    { value: "+973", label: "(+973) Bahrain", countryCode: "🇧🇭" },
    { value: "+974", label: "(+974) Qatar", countryCode: "🇶🇦" },
    { value: "+975", label: "(+975) Bhutan", countryCode: "🇧🇹" },
    { value: "+976", label: "(+976) Mongolia", countryCode: "🇲🇳" },
    { value: "+977", label: "(+977) Nepal", countryCode: "🇳🇵" },
    { value: "+991", label: "(+991) Azerbaijan", countryCode: "🇦🇿" },
    { value: "+992", label: "(+992) Kyrgyzstan", countryCode: "🇰🇲" },
    { value: "+993", label: "(+993) Turkmenistan", countryCode: "🇹🇲" },
    { value: "+994", label: "(+994) Azerbaijan", countryCode: "🇦🇿" },
    { value: "+995", label: "(+995) Georgia", countryCode: "🇬🇪" },
    { value: "+996", label: "(+996) Kyrgyzstan", countryCode: "🇰🇲" },
    { value: "+998", label: "(+998) Uzbekistan", countryCode: "🇺🇿" },
    { value: "+999", label: "(+999) International", countryCode: "🌐" },
    { value: "+1-242", label: "(+1-242) Bahamas", countryCode: "🇧🇸" },
    { value: "+1-246", label: "(+1-246) Barbados", countryCode: "🇧🇧" },
    { value: "+1-264", label: "(+1-264) Anguilla", countryCode: "🇦🇬" },
    { value: "+1-268", label: "(+1-268) Antigua and Barbuda", countryCode: "🇦🇮" },
    { value: "+1-284", label: "(+1-284) British Virgin Islands", countryCode: "🇻🇬" },
    { value: "+1-340", label: "(+1-340) US Virgin Islands", countryCode: "🇻🇬" },
    { value: "+1-345", label: "(+1-345) Cayman Islands", countryCode: "🇰🇾" },
    { value: "+1-441", label: "(+1-441) Bermuda", countryCode: "🇧🇲" },
    { value: "+1-473", label: "(+1-473) Grenada", countryCode: "🇬🇩" },
    { value: "+1-649", label: "(+1-649) Turks and Caicos Islands", countryCode: "🇹🇨" },
    { value: "+1-664", label: "(+1-664) Montserrat", countryCode: "🇲🇸" },
    { value: "+1-670", label: "(+1-670) Northern Mariana Islands", countryCode: "🇲🇵" },
    { value: "+1-671", label: "(+1-671) Guam", countryCode: "🇬🇲" },
    { value: "+1-672", label: "(+1-672) American Samoa", countryCode: "🇺🇸" },
    { value: "+1-673", label: "(+1-673) Cook Islands", countryCode: "🇨🇰" },
    { value: "+1-674", label: "(+1-674) Niue", countryCode: "🇳🇵" },
    { value: "+1-675", label: "(+1-675) Pitcairn Islands", countryCode: "🇵🇳" },
    { value: "+1-677", label: "(+1-677) Marshall Islands", countryCode: "🇲🇭" },
    { value: "+1-678", label: "(+1-678) Micronesia", countryCode: "🇫🇲" },
    { value: "+1-679", label: "(+1-679) Federated States of Micronesia", countryCode: "🇫🇲" },
    { value: "+1-680", label: "(+1-680) Palau", countryCode: "🇵🇼" },
    { value: "+1-684", label: "(+1-684) American Samoa", countryCode: "🇦🇸" },
    { value: "+1-689", label: "(+1-689) Cook Islands", countryCode: "🇨🇰" },
    { value: "+1-721", label: "(+1-721) Sint Maarten", countryCode: "🇸🇽" },
]


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            inputClasses: "SearchFieldGroup",
            showToolTip: false,
            searchQuery: "",
            selectedTag: "",
            tagType: "",
            suggestions: this.props.suggestions,
            macrosSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "macro"),
            specificSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "specific"),
            multipleSuggestion: this.props.suggestions.filter(suggestion => suggestion.type === "multiple"),
            placeholder: "",
        }
        this.searchInput = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.focus = this.focus.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.searchCallBack = this.searchCallBack.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state.expanded = this.props.persist ? true : false;
        this.state.inputClasses = this.props.persist ? "SearchFieldGroup if-active" : "SearchFieldGroup";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.persist !== this.props.persist) {
            this.updateAndNotify();
        }
    }

    focus() {
        if (!this.props.persist) {
            this.searchInput.current.focus()
        }
    }

    updateAndNotify() {
        this.setState({
            expanded: true,
            inputClasses: "SearchFieldGroup if-active"
        })
    }

    toggleToolTip = (e) => {
        e.stopPropagation()
        this.setState({
            showToolTip: !this.state.showToolTip
        })
    }
    toggle() {
        this.props.onClick();

        if (this.props.persist) {
            this.searchInput.current.focus();
            return;
        } else {

            if (this.state.expanded) {
                this.setState({
                    expanded: false,
                    inputClasses: "SearchFieldGroup"
                })
            } else {
                this.setState({
                    expanded: true,
                    inputClasses: "SearchFieldGroup if-active"
                })
                this.searchInput.current.focus();
            }
        }

    }

    setSearch(option) {
        this.searchInput.current.value = option;
    }

    setPrimaryInput(tag) {
        this.setState({
            selectedTag: tag.value,
            tagType: tag.type,
        })
        this.searchInput.current.value = ""

        if (tag.value.slice(1) === "gender") {
            this.setState({
                suggestions: [{ value: "Male", label: "Male", type: "" }, { value: "Female", label: "Female", type: "" }],
                placeholder: "Enter a gender",
            })
        }
        this.searchInput.current.focus();
    }

    handleSearchQueryChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleKeydown = (e, tag) => {
        if (e.key === "Enter") {
            this.searchCallBack(tag);
        }
    }

    searchCallBack(tag) {
        this.setState({
            selectedTag: "",
            tagType: "",
            suggestions: searchSuggestions,
            placeholder: "",
        })
        this.searchInput.current.value = ""
        this.searchInput.current.focus();
        this.props.searchCallBack(tag);
    }

    onCancelClick() {
        this.setState({
            selectedTag: "",
            tagType: "",
            suggestions: searchSuggestions,
            placeholder: "",
        })
        this.searchInput.current.value = "";
    }

    render() {

        return (
            <div className={this.props.className}>
                <div className={" justify-content-end d-flex align-items-center"}>
                    <div className="searchBar">
                        <SearchButton onClick={this.toggle} className={this.props.invert ? "invert" : ""} icon={<i className="bi bi-search"></i>} toolTip={this.props.toolTip} showToolTip={this.state.showToolTip} onMouseEnter={this.toggleToolTip} onMouseLeave={
                            this.toggleToolTip}></SearchButton>

                    </div>{this.state.selectedTag !== "" &&
                        <SearchTags showEdit={false} onCancelClick={this.onCancelClick} type={this.state.tagType}>{this.state.selectedTag}</SearchTags>
                    }
                    <div className={"d-flex align-items-center " + this.state.inputClasses} onAnimationEnd={this.focus}>
                        <input type={"text"} className={"SearchField"} placeholder={this.state.placeholder} ref={this.searchInput} onChange={this.handleSearchQueryChange} onKeyDown={(e) => this.handleKeydown(e, { type: this.state.tagType, value: this.state.selectedTag + "(" + this.searchInput.current.value + ")" })}></input>
                        {this.state.selectedTag === "" &&
                            <div className={"dropdown "} style={{ "--maxItems": 5, "gridTemplateColumns": ["@", ":", "+", "#"].includes(this.state.searchQuery[0]) ? "1fr" : "" }}>
                                {(this.state.searchQuery[0] === ":" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&
                                    <div className="macros">
                                        <div className="d-flex tagDescListTile macros">
                                            <div className="icon macros">
                                                :
                                            </div>
                                            <div className="tagDesc macros">
                                                <h6 className="macros">:MacroName</h6>
                                                <p>
                                                    Predefined macros for quick and easy search filtering.
                                                </p>
                                            </div>
                                        </div>

                                        {this.state.macrosSuggestion.length === 0 ?
                                            <div className="noMacrosPlaceHolder">
                                                There are no macros created. Click below to create a new macro.
                                                <StdButton onClick={() => this.props.toggleTagMacros("tm")} className={"primary"}>Create New Macro</StdButton>
                                            </div>
                                            :
                                            <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                                {this.state.macrosSuggestion.map((option, index) => {
                                                    if (((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type !== "specific" && option.type !== "multiple")) {
                                                        return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.searchCallBack({ type: option.type, value: option.value })}>{option.label}</StdInputDropDownOption>
                                                    }
                                                })}
                                            </div>
                                        }


                                    </div>
                                }
                                {(this.state.searchQuery[0] === "@" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&

                                    <div className="specific">
                                        <div className="d-flex tagDescListTile specific">
                                            <div className="icon specific">
                                                @
                                            </div>
                                            <div className="tagDesc specific">
                                                <h6 className="specific">@column(interest)</h6>
                                                <p>
                                                    Targets specific column, only return entries with column value like interest
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                            {this.state.specificSuggestion.map((option, index) => {
                                                if ((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type === "specific") {
                                                    return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.setPrimaryInput(option)}>{option.label}</StdInputDropDownOption>
                                                }
                                            }
                                            )}
                                        </div>
                                    </div>
                                }
                                {(this.state.searchQuery[0] === "+" || !["@", ":", "+", "#"].includes(this.state.searchQuery[0]) || this.state.searchQuery === "") &&
                                    <div className="multiple">
                                        <div className="d-flex tagDescListTile multiple">
                                            <div className="icon multiple">
                                                +
                                            </div>
                                            <div className="tagDesc multiple">
                                                <h6 className="multiple">+column(interest)</h6>
                                                <p>
                                                    Multiple targeting of specific column, returns entries with column value like interestA or interestB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-xs-3 row-cols-md-2 row-cols-lg-3 row-cols-1 searchSuggestions">
                                            {this.state.multipleSuggestion.map((option, index) => {
                                                if ((option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") && option.type === "multiple") {
                                                    return <StdInputDropDownOption key={index} value={option.value} onClick={() => this.setPrimaryInput(option)}>{option.label}</StdInputDropDownOption>
                                                }
                                            }
                                            )}
                                        </div>
                                    </div>
                                }

                            </div>
                        }
                        {this.state.selectedTag !== "" &&
                            <div className="dropdown row" style={{ "--maxItems": 5 }}>
                                {this.state.suggestions.map((option, index) => {
                                    if (option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || this.state.searchQuery === "") {
                                        return <StdInputDropDownOption className={"col-12 col-md-6 col-lg-3"} key={index} value={option.value} onClick={() => this.searchCallBack({ type: this.state.tagType, value: this.state.selectedTag + "(" + option.value + ")" })}>{option.label}</StdInputDropDownOption>
                                    }
                                }
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
SearchBar.defaultProps = {
    invert: false,
    suggestions: searchSuggestions,
}

export class StdSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            inputClasses: "SearchFieldGroup",
            showToolTip: false,
            searchQuery: "",
            selectedTag: "",
            tagType: "",
            suggestions: this.props.suggestions,
            placeholder: "",
        }
        this.searchInput = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.focus = this.focus.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.searchCallBack = this.searchCallBack.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state.expanded = this.props.persist ? true : false;
        this.state.inputClasses = this.props.persist ? "SearchFieldGroup if-active" : "SearchFieldGroup";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.persist !== this.props.persist) {
            this.updateAndNotify();
        }
    }

    focus() {
        if (!this.props.persist) {
            this.searchInput.current.focus()
        }
    }

    updateAndNotify() {
        this.setState({
            expanded: true,
            inputClasses: "SearchFieldGroup if-active"
        })
    }

    toggleToolTip = (e) => {
        e.stopPropagation()
        if (this.props.toolTip !== null) {

            this.setState({
                showToolTip: !this.state.showToolTip
            })
        }
    }
    toggle() {
        this.props.onClick();

        if (this.props.persist) {
            this.searchInput.current.focus();
            return;
        } else {

            if (this.state.expanded) {
                this.setState({
                    expanded: false,
                    inputClasses: "SearchFieldGroup"
                })
            } else {
                this.setState({
                    expanded: true,
                    inputClasses: "SearchFieldGroup if-active"
                })
                this.searchInput.current.focus();
            }
        }

    }

    setSearch(option) {
        this.searchInput.current.value = option;
    }

    handleSearchQueryChange = (e) => {
        console.log(e.target.value);
        this.setState({
            searchQuery: e.target.value
        })
        this.props.searchChangeCallBack(e.target.value);
    }

    handleKeydown = (e, tag) => {
        if (e.key === "Enter") {
            this.searchCallBack(tag);
        }
    }

    searchCallBack(query) {
        this.props.searchCallBack(query);
    }

    render() {

        return (
            <div className={this.props.className}>
                <div className={" justify-content-end d-flex align-items-center"}>
                    <div className="searchBar">
                        <SearchButton onClick={this.toggle} className={this.props.invert ? "invert" : ""} hasToolTip={false} icon={<i className="bi bi-search"></i>}></SearchButton>
                    </div>
                    <div className={"d-flex align-items-center " + this.state.inputClasses} onAnimationEnd={this.focus}>
                        <input type={"text"} className={"SearchField"} placeholder={this.state.placeholder} ref={this.searchInput} onChange={this.handleSearchQueryChange} onKeyDown={(e) => this.handleKeydown(e, { type: this.state.tagType, value: this.state.selectedTag + "(" + this.searchInput.current.value + ")" })}></input>

                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
StdSearchBar.defaultProps = {
    suggestions: [],
}


export class SearchButton extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"searchButton"} >
                <button className={"iconButton " + this.props.className} onClick={this.props.onClick} style={{ width: this.props.size, height: this.props.size }} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                    {this.props.icon}
                </button>
                {this.props.hasToolTip &&

                    <div className="tooltiptext">
                        {this.props.toolTip}

                    </div>
                }

            </SizedBox>
        )
    }
}
SearchButton.defaultProps = {
    size: "56px",
}

export class Hamburger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            classList: "ham hamRotate ham1",
        }
        this.toggle = this.toggle.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {

            this.handleUpdate(this.props.show);
        }
    }

    handleUpdate(show) {
        if (show) {
            this.setState({
                classList: "ham hamRotate ham1 active",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.setState({
                classList: "ham hamRotate ham1 ",
                toggled: !this.state.toggled
            }
            )
        }
    }

    toggle = () => {
        this.props.onClick();
        if (this.state.toggled) {
            this.setState({
                classList: "ham hamRotate ham1 ",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.props.onClick()
            this.setState({
                classList: "ham hamRotate ham1 active",
                toggled: !this.state.toggled
            }
            )
        }
    }

    render() {

        return (
            <div className={this.props.className} onClick={this.toggle}>

                <svg className={this.state.classList} viewBox="0 0 100 100" width={this.props.size} height={this.props.size}>
                    <path
                        class="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                    <path
                        class="line middle"
                        d="m 30,50 h 40" />
                    <path
                        class="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                </svg>
                {this.props.children}
            </div>
        )
    }
}

Hamburger.defaultProps = {
    size: "56px",
}

export class ActionsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: "actionsMenuToggle",
            actionsMenuClass: "actionsMenu",
            toggled: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle = () => {
        this.props.onClick()
        if (this.state.toggled) {
            this.setState({
                classList: "actionsMenuToggle ",
                actionsMenuClass: "actionsMenu",
                toggled: !this.state.toggled
            }
            )
        } else {
            this.props.onClick()
            this.setState({
                classList: "actionsMenuToggle active ",
                actionsMenuClass: "actionsMenu showActions",
                toggled: !this.state.toggled
            }
            )
        }
    }

    render() {
        return (
            <div className={" " + this.props.className} title={"Actions"} style={this.props.style}>

                <div className={this.state.classList + " text-center"} onClick={this.toggle}>
                    <i class="bi bi-grid-3x3-gap-fill"></i>
                </div>
                <div className={this.state.actionsMenuClass}>

                    {this.props.children}
                </div>
            </div>
        )
    }
}

ActionsButton.defaultProps = {
    size: "32px",
}
export class IconButton extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                <button className={"iconButton " + this.props.className} onClick={this.props.onClick} title={this.props.title}>
                    {this.props.icon}
                </button>
            </SizedBox>
        )
    }
}
IconButton.defaultProps = {
    className: "",
    size: "32px",
}
export class IconButtonAsLink extends React.Component {
    render() {
        return (
            <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                <Link to={this.props.to} className={"iconButton " + this.props.className} onClick={this.props.onClick} title={this.props.title}>
                    {this.props.icon}
                </Link>
            </SizedBox>
        )
    }
}
IconButtonAsLink.defaultProps = {
    className: "",
    size: "32px",
}

export class IconButtonWithText extends React.Component {
    render() {
        return (
            <button className={"align-items-center d-flex justify-content-center iconButton " + this.props.className} onClick={this.props.onClick}>
                <SizedBox width={this.props.size} height={this.props.size} className={"align-items-center d-flex justify-content-center "}>
                    <div>
                        {this.props.icon}
                    </div>
                </SizedBox>
                {this.props.label}
            </button>
        )
    }
}
IconButtonWithText.defaultProps = {
    className: "",
    size: "32px",
}

export class SearchTags extends React.Component {
    TagType = { DEFAULT: "DEFAULT", SPECIFIC: "SPECIFIC", MULTIPLE: "MULTIPLE", EXCLUDE: "EXCLUDE" }
    constructor(props) {
        super(props);
        this.state = {
            type: this.TagType.DEFAULT,
            mode: "desktop",
            showTagOverlay: false
        }

        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        const md = 768;
        if (window.innerWidth < md) {
            this.setState({ mode: "mobile" })
        } else {
            this.setState({ mode: "desktop" })
        }
    }

    toggleDelete() {
        this.setState({
            showTagOverlay: !this.state.showTagOverlay
        })
    }

    render() {
        let type = " default";
        switch (this.props.type) {
            case "default": type = " default"; break;
            case "specific": type = " specific"; break;
            case "multiple": type = " multiple"; break;
            case "exclude": type = " exclude"; break;
            case "truncator": type = " truncator"; break;
            case "base": type = " base"; break;
            default: type = " default"; break;

        }
        if (type === " truncator") {
            return (
                <div className={"searchTag" + type}>
                    <span>{this.props.children}</span>
                </div>
            )
        }

        if (this.state.mode === "mobile") {
            return (
                <div className={"searchTag d-flex align-items-center" + type}>
                    <span>{this.props.children}</span>
                    {this.props.showRemove ?
                        <div className={"searchTag-delete"} onClick={this.props.onCancelClick} ><i class="bi bi-x"></i></div> : <div />}
                </div>
            )
        } else {
            return (

                <div className={"searchTag searchTag-desktop d-flex align-items-center" + type}>
                    {this.props.showRemove ? <div className={"searchTag-deleteOverlay"}>
                        <i class="bi bi-pencil" onClick={this.props.onEditClick}></i>
                        <i class="bi bi-x-circle" onClick={this.props.onCancelClick}></i>
                    </div> : <div />
                    }

                    <span>{this.props.children}</span>
                </div>
            )
        }
    }
}

SearchTags.defaultProps = {
    showRemove: true,
}

export class TagsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxTags: 3,
            startX: 0,
            endX: 0,
            slideClass: "",
            slideProgression: 0,
        }
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    handleTouchStart = (e) => {

        this.setState({
            startX: e.touches[0].clientX,
            slideClass: "sliding",
            slideProgression: 0,
        }
        )
        console.log(e.touches[0].clientX);
    }

    handleMouseDown = (e) => {
        this.setState({
            startX: e.clientX,
            slideClass: "sliding",
            slideProgression: 0,
        })
    }

    handleTouchMove = (e) => {
        this.setState({
            endX: e.touches[0].clientX,
            slideProgression: (this.state.endX - this.state.startX) + "px",
        })
        console.log(e.touches[0].clientX);
    }

    handleMouseMove = (e) => {
        if (this.state.startX - this.state.endX > -150) {

            this.setState({
                endX: e.clientX,
                slideProgression: (this.state.endX - this.state.startX) + "px",
            })
        }
    }

    handleTouchEnd = (e) => {
        console.log("END")
        if (this.state.startX - this.state.endX < -150) {
            this.setState({
                slideClass: "",
                slideProgression: 0,
            })
            this.props.deleteAllTags();
        }
    }

    handleMouseUp = (e) => {
        if (this.state.startX - this.state.endX < -150) {
            this.setState({
                slideClass: "",
                slideProgression: 0,
            })
            this.props.deleteAllTags();
        }
    }

    resize() {
        const sm = 576;
        const md = 768;
        const lg = 992;
        const xl = 1200;
        const xxl = 1600;
        if (window.innerWidth >= xxl) {
            this.setState({
                maxTags: -1
            })
        } else if (window.innerWidth >= xl) {
            this.setState({
                maxTags: 6
            })
        } else if (window.innerWidth >= lg) {
            this.setState({
                maxTags: 5
            })
        } else if (window.innerWidth >= md) {
            this.setState({
                maxTags: 4
            })
        } else if (window.innerWidth >= sm) {
            this.setState({
                maxTags: 3
            })
        } else if (window.innerWidth < sm) {
            this.setState({
                maxTags: 3
            })
        }
    }

    render() {
        const tags = React.Children.count(this.props.children);
        const tagsList = React.Children.toArray(this.props.children);
        if (React.Children.count(this.props.children) === 0) {
            return (
                <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className} onClick={this.props.onClick}>
                    <h1>No Tags yet</h1>
                </div>
            )
        }
        if (!this.props.truncate || this.state.maxTags === -1) {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        {this.props.enableDeleteAll &&
                            <span className="instructions">Slide right to delete all tags</span>
                        }
                        <div className="tagsContainer">
                            <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className + " " + this.state.slideClass}
                                onClick={this.props.onClick}
                                onTouchStart={this.handleTouchStart}
                                onMouseDown={this.handleMouseDown}
                                onTouchMove={this.handleTouchMove}
                                onMouseMove={this.handleMouseMove}
                                onTouchEnd={this.handleTouchEnd}
                                onMouseUp={this.handleMouseUp}
                                style={{ "--slideDistance": this.state.slideProgression }}>
                                {this.props.showlabel &&
                                    <div className="tagboxLabel" style={{ color: "black" }}>Search Tags:</div>
                                }
                                {this.props.children}
                            </div>
                            <div className="text-left deleteBg" >

                                <i class="bi bi-trash3-fill"></i> Delete All
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="tagsContainer">
                        <div className={"d-flex align-items-center tagsBox flex-wrap justify-content-start " + this.props.className + " " + (this.props.enableDeleteAll && " tagsBox-desktop")} >
                            {this.props.showlabel &&
                                <div className="tagboxLabel" style={{ color: "black" }}>Search Tags:</div>
                            }
                            {this.props.children}
                        </div>
                        <div className="text-left deleteBg" onClick={this.props.deleteAllTags}>
                            <div className="deleteBtn">
                                <i class="bi bi-trash3-fill"></i>
                                <span>Delete All</span>
                            </div>
                        </div>
                    </div>
                )
            }

        } else {
            return (

                <div className={"d-flex tagsBox flex-wrap justify-content-start " + this.props.className} onClick={this.props.onClick} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                    {tags > this.state.maxTags ? tagsList.slice(0, this.state.maxTags) : this.props.children}
                    {tags > this.state.maxTags ? <SearchTags className={"align-self-stretch"} type={"truncator"} showRemove={false}>({tags - this.state.maxTags}) More...</SearchTags> : <div></div>}
                </div>
            )
        }
    }
}

TagsBox.defaultProps = {
    className: "",
    truncate: false,
    showlabel: false,
    enableDeleteAll: false,
    onClick: () => { }
}

//A beautiful checkbox
export class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            className: "checkbox"
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle = () => {
        this.setState({
            checked: !this.state.checked,
            className: this.state.checked ? "checkbox" : "checkbox checked"
        })
        this.props.onClick();
    }
    render() {
        return (
            <div className={this.state.className} onClick={this.toggle}>
                <div className="checkbox-icon">
                    <i class="bi bi-check"></i>
                </div>
            </div>
        )
    }
}

export class StdButton extends React.Component {
    constructor(props) {
        super(props);
        this.getPos = this.getPos.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.ripple = this.ripple.bind(this);
        this.reset = this.reset.bind(this);
        this.btnRef = React.createRef();
        this.state = {
            ripplePosX: 0,
            ripplePosY: 0,
            classes: ""
        }
    }


    getPos = (e) => {
        this.setState({
            ripplePosX: e.clientX - this.btnRef.current.getBoundingClientRect().left,
            ripplePosY: e.clientY - this.btnRef.current.getBoundingClientRect().top
        })
    }
    reset() {
        this.setState({
            classes: ""
        })
    }

    handleClick = (e) => {
        this.getPos(e);
        this.setState({ classes: "ripple" })
        this.props.onClick();
    }

    ripple = (e) => {
        this.getPos(e);
        this.setState({ classes: "ripple" })
    }

    render() {


        return (
            <button
                className={"button " + this.state.classes + " " + this.props.className}
                style={{ "--x": this.state.ripplePosX + "px", "--y": this.state.ripplePosY + "px" }}
                onClick={this.handleClick}
                disabled={this.props.disabled}
                onAnimationEnd={this.reset}
                ref={this.btnRef}>
                {this.props.children}
            </button>
        )
    }

}
StdButton.defaultProps = {
    disabled: false,
}

export class MultiStepBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: this.props.currentStep,
            progression: 0,
        }
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.setStep = this.setStep.bind(this);
    }

    nextStep() {
        this.setState({
            currentStep: this.state.currentStep + 1,
        })
    }

    prevStep() {
        this.setState({
            currentStep: this.state.currentStep - 1,
        })
    }

    setStep(e) {
        this.setState({
            currentStep: e
        })
    }

    render() {
        return (
            <div className="Multistep-Container">
                {this.props.children.map((child, index) => {
                    if (React.isValidElement(child)) {
                        return (
                            <div key={index} className={"step " + (index === this.state.currentStep ? "active" : "")}>
                                {React.cloneElement(child, { nextStep: this.nextStep, prevStep: this.prevStep, setStep: this.setStep })}
                            </div>
                        )
                    } else {
                        return child
                    }
                })}
            </div>
        )
    }
}


export class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: this.props.currentStep
        }
    }

    render() {
        return (
            <div className={"step " + (this.props.currentStep == this.props.step? "active" : "")}>
                {this.props.children}
            </div>
        )
    }
}

export class ListMapper extends React.Component{

    addLink = (a,b) =>{
        const aKey = this.props.settings.tableHeaders[0]
        const bKey = this.props.settings.tableHeaders[1]
        const itemToAdd = {}
        itemToAdd[aKey] = a
        itemToAdd[bKey] = b
        console.log(a,b);
        this.props.addLink(itemToAdd);
        this.props.requestRefresh();
    }

    deleteLink = (a,b) =>{
        const aKey = this.props.settings.tableHeaders[0]
        const bKey = this.props.settings.tableHeaders[1]
        const itemToDelete = {}
        itemToDelete[aKey] = a;
        itemToDelete[bKey] = b;
        console.log(a,b);
        this.props.deleteLink(itemToDelete);
        this.props.requestRefresh();
    }

    render(){
        return(
            <div className="listMapper">
                <div className="listMapper-header">{this.props.title}</div>
                <div className="listMapper-Selector">
                    {this.props.data?
                    
                    this.props.data.map((item, index) => {
                        return (
                            <ListMapperItem currItem = {this.props.currItemID} addLink={this.addLink} deleteLink={this.deleteLink} key={index} currentMap={this.props.currentMap} item={item} headers = {this.props.headers} settings={this.props.settings}></ListMapperItem>
                        )
                    }): ""}
                </div>
            </div>
        )
    }
}

export class ListMapperItem extends React.Component{
    render(){
        return(
            this.props.currentMap.some((item) => item[this.props.settings.matchingHeaders[0]] == this.props.item[this.props.settings.matchingHeaders[1]]) ? 
                <div className="listMapperItem active"  onClick={()=>this.props.deleteLink(this.props.item[this.props.settings.matchingHeaders[1]],this.props.currItem)}>
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                })}
            </div>
            : 
            
            <div className="listMapperItem" onClick={()=>this.props.addLink(this.props.item[this.props.settings.matchingHeaders[1]],this.props.currItem,)}>
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                })}
            </div>
        )
    }
}

export class ListMapperView extends React.Component{
    render(){
        return(
            <div className="listMapper">
                <div className="listMapper-header">{this.props.title}</div>
                <div className="listMapper-Selector">
                    {this.props.data?
                    this.props.data.map((item, index) => {
                        return (
                            <ListMapperViewItem key={index} item={item} headers = {this.props.headers} settings={this.props.settings}></ListMapperViewItem>
                        )
                    }): ""}
                </div>
            </div>
        )
    }
}

export class ListMapperViewItem extends React.Component{
    render(){
        return(
            <div className="listMapperItem active">
                {Object.keys(this.props.headers).map((key, index) => {
                    if(!this.props.headers[key].primaryKey && !this.props.headers[key].foreignKey ){
                        
                    return (
                        this.props.item[key] + " "
                    )
                    }
                })}
            </div>
        )
    }
}