import React from "react";

// List of all potential country phone number code and their flag unicodes
// const telCodes = [
//   { value: "+1", label: "(+1) USA", countryCode: "🇺🇸" },
//   { value: "+7", label: "(+7) Russia", countryCode: "🇷🇺" },
//   { value: "+20", label: "(+20) Egypt", countryCode: "🇪🇬" },
//   { value: "+27", label: "(+27) South Africa", countryCode: "🇿🇦" },
//   { value: "+30", label: "(+30) Greece", countryCode: "🇬🇷" },
//   { value: "+31", label: "(+31) Netherlands", countryCode: "🇳🇱" },
//   { value: "+32", label: "(+32) Belgium", countryCode: "🇧🇪" },
//   { value: "+33", label: "(+33) France", countryCode: "🇫🇷" },
//   { value: "+34", label: "(+34) Spain", countryCode: "🇪🇸" },
//   { value: "+36", label: "(+36) Hungary", countryCode: "🇭🇺" },
//   { value: "+39", label: "(+39) Italy", countryCode: "🇮🇹" },
//   { value: "+40", label: "(+40) Romania", countryCode: "🇷🇴" },
//   { value: "+41", label: "(+41) Switzerland", countryCode: "🇨🇭" },
//   { value: "+43", label: "(+43) Austria", countryCode: "🇦🇹" },
//   { value: "+44", label: "(+44) United Kingdom", countryCode: "🇬🇧" },
//   { value: "+45", label: "(+45) Denmark", countryCode: "🇩🇰" },
//   { value: "+46", label: "(+46) Sweden", countryCode: "🇸🇪" },
//   { value: "+47", label: "(+47) Norway", countryCode: "🇳🇴" },
//   { value: "+48", label: "(+48) Poland", countryCode: "🇵🇱" },
//   { value: "+49", label: "(+49) Germany", countryCode: "🇩🇪" },
//   { value: "+51", label: "(+51) Brazil", countryCode: "🇧🇷" },
//   { value: "+52", label: "(+52) Mexico", countryCode: "🇲🇽" },
//   { value: "+53", label: "(+53) Cuba", countryCode: "🇨🇵" },
//   { value: "+54", label: "(+54) Argentina", countryCode: "🇦🇷" },
//   { value: "+55", label: "(+55) Brazil", countryCode: "🇧🇷" },
//   { value: "+56", label: "(+56) Chile", countryCode: "🇨🇱" },
//   { value: "+57", label: "(+57) Colombia", countryCode: "🇨🇴" },
//   { value: "+58", label: "(+58) Venezuela", countryCode: "🇻🇪" },
//   { value: "+60", label: "(+60) Malaysia", countryCode: "🇲🇾" },
//   { value: "+61", label: "(+61) Australia", countryCode: "🇦🇺" },
//   { value: "+64", label: "(+64) New Zealand", countryCode: "🇳🇿" },
//   { value: "+65", label: "(+65) Singapore", countryCode: "🇸🇬" },
//   { value: "+66", label: "(+66) Thailand", countryCode: "🇹🇭" },
//   { value: "+81", label: "(+81) Japan", countryCode: "🇯🇵" },
//   { value: "+82", label: "(+82) South Korea", countryCode: "🇰🇷" },
//   { value: "+84", label: "(+84) Vietnam", countryCode: "🇻🇳" },
//   { value: "+86", label: "(+86) China", countryCode: "🇨🇳" },
//   { value: "+90", label: "(+90) Turkey", countryCode: "🇹🇷" },
//   { value: "+91", label: "(+91) India", countryCode: "🇮🇳" },
//   { value: "+92", label: "(+92) Pakistan", countryCode: "🇵🇰" },
//   { value: "+93", label: "(+93) Afghanistan", countryCode: "🇦🇫" },
//   { value: "+94", label: "(+94) Sri Lanka", countryCode: "🇱🇰" },
//   { value: "+95", label: "(+95) Myanmar", countryCode: "🇲🇲" },
//   { value: "+98", label: "(+98) Iran", countryCode: "🇮🇷" },
//   { value: "+211", label: "(+211) South Sudan", countryCode: "🇸🇩" },
//   { value: "+212", label: "(+212) Morocco", countryCode: "🇲🇦" },
//   { value: "+213", label: "(+213) Algeria", countryCode: "🇩🇿" },
//   { value: "+216", label: "(+216) Tunisia", countryCode: "🇹🇳" },
//   { value: "+218", label: "(+218) Libya", countryCode: "🇱🇮" },
//   { value: "+220", label: "(+220) Gambia", countryCode: "🇬🇲" },
//   { value: "+221", label: "(+221) Senegal", countryCode: "🇸🇳" },
//   { value: "+222", label: "(+222) Mauritania", countryCode: "🇲🇷" },
//   { value: "+223", label: "(+223) Mali", countryCode: "🇲🇱" },
//   { value: "+224", label: "(+224) Guinea", countryCode: "🇬🇳" },
//   { value: "+225", label: "(+225) Côte d'Ivoire", countryCode: "🇨🇮" },
//   { value: "+226", label: "(+226) Burkina Faso", countryCode: "🇧🇫" },
//   { value: "+227", label: "(+227) Niger", countryCode: "🇳🇪" },
//   { value: "+228", label: "(+228) Togo", countryCode: "🇹🇬" },
//   { value: "+229", label: "(+229) Benin", countryCode: "🇧🇯" },
//   { value: "+230", label: "(+230) Mauritius", countryCode: "🇲🇺" },
//   { value: "+231", label: "(+231) Liberia", countryCode: "🇱🇷" },
//   { value: "+232", label: "(+232) Sierra Leone", countryCode: "🇸🇱" },
//   { value: "+233", label: "(+233) Ghana", countryCode: "🇬🇭" },
//   { value: "+234", label: "(+234) Nigeria", countryCode: "🇳🇦" },
//   { value: "+235", label: "(+235) Chad", countryCode: "🇹🇩" },
//   { value: "+236", label: "(+236) Central African Republic", countryCode: "🇨🇫" },
//   { value: "+237", label: "(+237) Cameroon", countryCode: "🇨🇲" },
//   { value: "+238", label: "(+238) Cape Verde", countryCode: "🇨🇻" },
//   { value: "+239", label: "(+239) Sao Tome and Principe", countryCode: "🇸🇹" },
//   { value: "+240", label: "(+240) Equatorial Guinea", countryCode: "🇬🇶" },
//   { value: "+241", label: "(+241) Gabon", countryCode: "🇬🇫" },
//   { value: "+242", label: "(+242) Congo", countryCode: "🇨🇬" },
//   { value: "+243", label: "(+243) Democratic Republic of the Congo", countryCode: "🇨🇩" },
//   { value: "+244", label: "(+244) Angola", countryCode: "🇦🇴" },
//   { value: "+245", label: "(+245) Guinea-Bissau", countryCode: "🇬🇷" },
//   { value: "+246", label: "(+246) Diego Garcia", countryCode: "🇩🇬" },
//   { value: "+247", label: "(+247) Ascension Island", countryCode: "🇦🇨" },
//   { value: "+248", label: "(+248) Seychelles", countryCode: "🇸🇨" },
//   { value: "+249", label: "(+249) Sudan", countryCode: "🇸🇩" },
//   { value: "+250", label: "(+250) Rwanda", countryCode: "🇷🇼" },
//   { value: "+251", label: "(+251) Ethiopia", countryCode: "🇪🇹" },
//   { value: "+252", label: "(+252) Somali", countryCode: "🇸🇲" },
//   { value: "+253", label: "(+253) Djibouti", countryCode: "🇩🇯" },
//   { value: "+254", label: "(+254) Kenya", countryCode: "🇰🇪" },
//   { value: "+255", label: "(+255) Tanzania", countryCode: "🇹🇿" },
//   { value: "+256", label: "(+256) Uganda", countryCode: "🇺🇬" },
//   { value: "+257", label: "(+257) Burundi", countryCode: "🇧🇮" },
//   { value: "+258", label: "(+258) Mozambique", countryCode: "🇲🇿" },
//   { value: "+260", label: "(+260) Zambia", countryCode: "🇿🇲" },
//   { value: "+261", label: "(+261) Madagascar", countryCode: "🇲🇬" },
//   { value: "+263", label: "(+263) Zimbabwe", countryCode: "🇿🇲" },
//   { value: "+264", label: "(+264) Namibia", countryCode: "🇳🇦" },
//   { value: "+265", label: "(+265) Malawi", countryCode: "🇲🇼" },
//   { value: "+266", label: "(+266) Lesotho", countryCode: "🇱🇸" },
//   { value: "+267", label: "(+267) Botswana", countryCode: "🇧🇼" },
//   { value: "+268", label: "(+268) Swaziland", countryCode: "🇸🇿" },
//   { value: "+269", label: "(+269) Comoros", countryCode: "🇰🇲" },
//   { value: "+290", label: "(+290) Saint Helena", countryCode: "🇸🇭" },
//   { value: "+291", label: "(+291) Eritrea", countryCode: "🇪🇷" },
//   { value: "+297", label: "(+297) Aruba", countryCode: "🇦🇼" },
//   { value: "+298", label: "(+298) Faroe Islands", countryCode: "🇫🇴" },
//   { value: "+299", label: "(+299) Greenland", countryCode: "🇬🇱" },
//   { value: "+350", label: "(+350) Gibraltar", countryCode: "🇬🇬" },
//   { value: "+351", label: "(+351) Portugal", countryCode: "🇵🇹" },
//   { value: "+352", label: "(+352) Luxembourg", countryCode: "🇱🇺" },
//   { value: "+353", label: "(+353) Ireland", countryCode: "🇮🇪" },
//   { value: "+354", label: "(+354) Iceland", countryCode: "🇮🇸" },
//   { value: "+355", label: "(+355) Albania", countryCode: "🇦🇱" },
//   { value: "+356", label: "(+356) Malta", countryCode: "🇲🇹" },
//   { value: "+357", label: "(+357) Cyprus", countryCode: "🇨🇾" },
//   { value: "+358", label: "(+358) Finland", countryCode: "🇫🇮" },
//   { value: "+359", label: "(+359) Bulgaria", countryCode: "🇧🇾" },
//   { value: "+370", label: "(+370) Lithuania", countryCode: "🇱🇹" },
//   { value: "+371", label: "(+371) Latvia", countryCode: "🇱🇻" },
//   { value: "+372", label: "(+372) Estonia", countryCode: "🇪🇪" },
//   { value: "+373", label: "(+373) Moldova", countryCode: "🇲🇩" },
//   { value: "+374", label: "(+374) Armenia", countryCode: "🇦🇲" },
//   { value: "+375", label: "(+375) Belarus", countryCode: "🇧🇾" },
//   { value: "+376", label: "(+376) Andorra", countryCode: "🇦🇩" },
//   { value: "+377", label: "(+377) Monaco", countryCode: "🇲🇨" },
//   { value: "+378", label: "(+378) San Marino", countryCode: "🇸🇲" },
//   { value: "+379", label: "(+379) Vatican City", countryCode: "🇻🇦" },
//   { value: "+380", label: "(+380) Ukraine", countryCode: "🇺🇦" },
//   { value: "+381", label: "(+381) Serbia", countryCode: "🇷🇸" },
//   { value: "+382", label: "(+382) Montenegro", countryCode: "🇲🇪" },
//   { value: "+385", label: "(+385) Croatia", countryCode: "🇭🇷" },
//   { value: "+386", label: "(+386) Slovenia", countryCode: "🇸🇮" },
//   { value: "+387", label: "(+387) Bosnia and Herzegovina", countryCode: "🇧🇦" },
//   { value: "+389", label: "(+389) Macedonia", countryCode: "🇲🇰" },
//   { value: "+420", label: "(+420) Czech Republic", countryCode: "🇨🇿" },
//   { value: "+421", label: "(+421) Slovakia", countryCode: "🇸🇰" },
//   { value: "+423", label: "(+423)Liechtenstein", countryCode: "🇱🇮" },
//   { value: "+500", label: "(+500) Falkland Islands", countryCode: "🇫🇰" },
//   { value: "+501", label: "(+501) Belize", countryCode: "🇲🇿" },
//   { value: "+502", label: "(+502) Guatemala", countryCode: "🇬🇹" },
//   { value: "+503", label: "(+503) El Salvador", countryCode: "🇸🇻" },
//   { value: "+504", label: "(+504) Honduras", countryCode: "🇭🇳" },
//   { value: "+505", label: "(+505) Nicaragua", countryCode: "🇳🇮" },
//   { value: "+506", label: "(+506) Costa Rica", countryCode: "🇨🇷" },
//   { value: "+507", label: "(+507) Panama", countryCode: "🇵🇦" },
//   { value: "+508", label: "(+508) Saint Pierre and Miquelon", countryCode: "🇵🇲" },
//   { value: "+509", label: "(+509) Haiti", countryCode: "🇭🇹" },
//   { value: "+590", label: "(+590) Saint Barthelemy", countryCode: "🇧🇱" },
//   { value: "+591", label: "(+591) Bolivia", countryCode: "🇧🇴" },
//   { value: "+593", label: "(+593) Ecuador", countryCode: "🇪🇨" },
//   { value: "+594", label: "(+594) French Guiana", countryCode: "🇬🇫" },
//   { value: "+595", label: "(+595) Paraguay", countryCode: "🇵🇾" },
//   { value: "+596", label: "(+596) Martinique", countryCode: "🇲🇨" },
//   { value: "+597", label: "(+597) Uruguay", countryCode: "🇺🇾" },
//   { value: "+598", label: "(+598) Suriname", countryCode: "🇸🇲" },
//   { value: "+599", label: "(+599) Greenland", countryCode: "🇬🇩" },
//   { value: "+670", label: "(+670) Timor-Leste", countryCode: "🇹🇲" },
//   { value: "+672", label: "(+672) Antartica", countryCode: "🇦🇶" },
//   { value: "+673", label: "(+673) Brunei", countryCode: "🇧🇳" },
//   { value: "+674", label: "(+674) Nauru", countryCode: "🇳🇷" },
//   { value: "+675", label: "(+675) Papua New Guinea", countryCode: "🇵🇬" },
//   { value: "+676", label: "(+676) Tonga", countryCode: "🇹🇬" },
//   { value: "+677", label: "(+677) Solomon Islands", countryCode: "🇸🇧" },
//   { value: "+678", label: "(+678) Vanuatu", countryCode: "🇻🇺" },
//   { value: "+679", label: "(+679) Fiji", countryCode: "🇫🇯" },
//   { value: "+680", label: "(+680) Palau", countryCode: "🇵🇼" },
//   { value: "+681", label: "(+681) Wallis and Futuna", countryCode: "🇼🇫" },
//   { value: "+682", label: "(+682) Cook Islands", countryCode: "🇨🇰" },
//   { value: "+683", label: "(+683) Niue", countryCode: "🇳🇺" },
//   { value: "+685", label: "(+685) Samoa", countryCode: "🇸🇲" },
//   { value: "+686", label: "(+686) Kiribati", countryCode: "🇰🇮" },
//   { value: "+687", label: "(+687) New Caledonia", countryCode: "🇨🇳" },
//   { value: "+688", label: "(+688) Tuvalu", countryCode: "🇹🇻" },
//   { value: "+689", label: "(+689) French Polynesia", countryCode: "🇵🇫" },
//   { value: "+690", label: "(+690) Tokelau", countryCode: "🇹🇰" },
//   { value: "+691", label: "(+691) Micronesia", countryCode: "🇲🇲" },
//   { value: "+692", label: "(+692) Marshall Islands", countryCode: "🇲🇭" },
//   { value: "+850", label: "(+850) North Korea", countryCode: "🇰🇵" },
//   { value: "+852", label: "(+852) Hong Kong", countryCode: "🇭🇰" },
//   { value: "+853", label: "(+853) Macau", countryCode: "🇲🇴" },
//   { value: "+855", label: "(+855) Cambodia", countryCode: "🇨🇰" },
//   { value: "+856", label: "(+856) Laos", countryCode: "🇱🇦" },
//   { value: "+880", label: "(+880) Bangladesh", countryCode: "🇧🇬" },
//   { value: "+886", label: "(+886) Taiwan", countryCode: "🇹🇼" },
//   { value: "+960", label: "(+960) Maldives", countryCode: "🇲🇻" },
//   { value: "+961", label: "(+961) Lebanon", countryCode: "🇱🇧" },
//   { value: "+962", label: "(+962) Jordan", countryCode: "🇯🇴" },
//   { value: "+963", label: "(+963) Syria", countryCode: "🇸🇾" },
//   { value: "+964", label: "(+964) Iraq", countryCode: "🇮🇶" },
//   { value: "+965", label: "(+965) Kuwait", countryCode: "🇭🇺" },
//   { value: "+966", label: "(+966) Saudi Arabia", countryCode: "🇸🇩" },
//   { value: "+967", label: "(+967) Yemen", countryCode: "🇾🇪" },
//   { value: "+968", label: "(+968) Oman", countryCode: "🇴🇲" },
//   { value: "+970", label: "(+970) Palestinian Territory", countryCode: "🇵🇸" },
//   { value: "+971", label: "(+971) United Arab Emirates", countryCode: "🇦🇪" },
//   { value: "+972", label: "(+972) Israel", countryCode: "🇮🇱" },
//   { value: "+973", label: "(+973) Bahrain", countryCode: "🇧🇭" },
//   { value: "+974", label: "(+974) Qatar", countryCode: "🇶🇦" },
//   { value: "+975", label: "(+975) Bhutan", countryCode: "🇧🇹" },
//   { value: "+976", label: "(+976) Mongolia", countryCode: "🇲🇳" },
//   { value: "+977", label: "(+977) Nepal", countryCode: "🇳🇵" },
//   { value: "+991", label: "(+991) Azerbaijan", countryCode: "🇦🇿" },
//   { value: "+992", label: "(+992) Kyrgyzstan", countryCode: "🇰🇲" },
//   { value: "+993", label: "(+993) Turkmenistan", countryCode: "🇹🇲" },
//   { value: "+994", label: "(+994) Azerbaijan", countryCode: "🇦🇿" },
//   { value: "+995", label: "(+995) Georgia", countryCode: "🇬🇪" },
//   { value: "+996", label: "(+996) Kyrgyzstan", countryCode: "🇰🇲" },
//   { value: "+998", label: "(+998) Uzbekistan", countryCode: "🇺🇿" },
//   { value: "+999", label: "(+999) International", countryCode: "🌐" },
//   { value: "+1-242", label: "(+1-242) Bahamas", countryCode: "🇧🇸" },
//   { value: "+1-246", label: "(+1-246) Barbados", countryCode: "🇧🇧" },
//   { value: "+1-264", label: "(+1-264) Anguilla", countryCode: "🇦🇬" },
//   { value: "+1-268", label: "(+1-268) Antigua and Barbuda", countryCode: "🇦🇮" },
//   { value: "+1-284", label: "(+1-284) British Virgin Islands", countryCode: "🇻🇬" },
//   { value: "+1-340", label: "(+1-340) US Virgin Islands", countryCode: "🇻🇬" },
//   { value: "+1-345", label: "(+1-345) Cayman Islands", countryCode: "🇰🇾" },
//   { value: "+1-441", label: "(+1-441) Bermuda", countryCode: "🇧🇲" },
//   { value: "+1-473", label: "(+1-473) Grenada", countryCode: "🇬🇩" },
//   { value: "+1-649", label: "(+1-649) Turks and Caicos Islands", countryCode: "🇹🇨" },
//   { value: "+1-664", label: "(+1-664) Montserrat", countryCode: "🇲🇸" },
//   { value: "+1-670", label: "(+1-670) Northern Mariana Islands", countryCode: "🇲🇵" },
//   { value: "+1-671", label: "(+1-671) Guam", countryCode: "🇬🇲" },
//   { value: "+1-672", label: "(+1-672) American Samoa", countryCode: "🇺🇸" },
//   { value: "+1-673", label: "(+1-673) Cook Islands", countryCode: "🇨🇰" },
//   { value: "+1-674", label: "(+1-674) Niue", countryCode: "🇳🇵" },
//   { value: "+1-675", label: "(+1-675) Pitcairn Islands", countryCode: "🇵🇳" },
//   { value: "+1-677", label: "(+1-677) Marshall Islands", countryCode: "🇲🇭" },
//   { value: "+1-678", label: "(+1-678) Micronesia", countryCode: "🇫🇲" },
//   { value: "+1-679", label: "(+1-679) Federated States of Micronesia", countryCode: "🇫🇲" },
//   { value: "+1-680", label: "(+1-680) Palau", countryCode: "🇵🇼" },
//   { value: "+1-684", label: "(+1-684) American Samoa", countryCode: "🇦🇸" },
//   { value: "+1-689", label: "(+1-689) Cook Islands", countryCode: "🇨🇰" },
//   { value: "+1-721", label: "(+1-721) Sint Maarten", countryCode: "🇸🇽" },
// ]

export class StdInput extends React.Component {
  state = {
    enabled: this.props.enabled,
    value: this.props.value,
    newValue:this.props.type === "multiselect" ? this.props.value ? this.props.value : [] : this.props.value,
    valueChanged: false,
    feedbackClass: "feedback",
  };
  componentDidMount() {
    this.setState({
      enabled: this.props.enabled ? this.props.enabled : false,
    });
  }

  updateValue = (value) => {
    this.setState({
      newValue: value,
      valueChanged: value !== this.state.value ? true : false,
    });
    if (!this.props.hasSaveBtn) {
      this.props.onChange(this.props.fieldLabel, value);
    }
  };

  toggleEdit = () => {
    if (this.props.enabled) {
      this.setState({
        enabled: !this.state.enabled,
      });
    } else {
      this.setState({
        enabled: false,
      });
    }
  };

  handleSave = (value) => {
    this.setState({
      value: value,
      valueChanged: false,
    });
    console.log(this.props.onChange(this.props.fieldLabel, value));
    this.props.onChange(this.props.fieldLabel, value) ?
      this.feedback({success:true, msg: "Changes Saved"}) : 
      this.feedback({success:false, msg: "Failed to save changes"});
  };

  feedback = (message) =>{
    console.log(message);
    if(message.success){
      this.setState({
        feedbackClass: "feedback show",
        feedback: message.msg
      })
    }else{
      this.setState({
        feedbackClass: "feedback failed show",
        feedback: message.msg
      })
    }
  }

  reset =() => {
    this.setState({
        feedbackClass: "feedback",
        feedback: ""
    })
  }
  render() {
    if (this.state.enabled) {
      return (
        <div className={"inputBox " + (this.props.sameLine ? "same-line" : "")}>
          <div className="inputBox-Label">{this.props.label}</div>
          {this.props.type === "text" && (
            <StdTextBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdTextBox>
          )}
          {this.props.type === "password" && (
            <StdPwdBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdPwdBox>
          )}
          {this.props.type === "email" && (
            <StdEmailBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdEmailBox>
          )}
          {this.props.type === "number" && (
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdNumberBox>
          )}
          {this.props.type === "time" && (
            <StdTimeBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdTimeBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "YYYY" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : new Date().getFullYear()}
              min={this.props.min ? this.props.min : new Date().getFullYear()-100}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "MM" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : 12}
              min={this.props.min ? this.props.min : 1}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && this.props.dateFormat === "DD" &&(
            <StdNumberBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              max={this.props.max ? this.props.max : 31}
              min={this.props.min ? this.props.min : 1}
            ></StdNumberBox>
          )}
          {this.props.type === "date" && !["YYYY","MM","DD"].includes(this.props.dateFormat) &&(
            <StdDateBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdDateBox>
          )}
          {this.props.type === "datetime" && (
            <StdDateTimeBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            ></StdDateTimeBox>
          )}

          {this.props.type === "dropdown" && (
            <StdDropDownBox
              updateValue={this.updateValue}
              value={this.state.newValue}
              options={this.props.options}
            ></StdDropDownBox>
          )}

          {this.props.type === "multiselect" && (
            <StdMultiSelect
              updateValue={this.updateValue}
              value={this.state.newValue}
              options={this.props.options}
            ></StdMultiSelect>
          )}

          {this.props.type === "QR" && (
            <StdQRBox
              updateValue={this.updateValue}
              value={this.state.newValue}
            >
            </StdQRBox>
          )}
          {this.props.hasSaveBtn && this.state.valueChanged && (
            <div
              className="inputSave"
              onClick={() => {
                this.handleSave(this.state.newValue);
              }}
            >
              <i class="bi bi-check-circle"></i>
            </div>
          )}
          <div className={this.state.feedbackClass} onAnimationEnd={this.reset}>
            {this.state.feedback}
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={this.toggleEdit} className={"inputBox disabled"}>
          <div className="inputBox-Label">{this.props.label}</div>
          <div className="read-only">
            {this.props.type === "dropdown" ? 
              (this.props.options.find(option => option.value === this.props.value) ? this.props.options.find(option => option.value === this.props.value).label : "") 
              : this.props.value
              }
            </div>

          {this.props.showIndicator && <i className="bi bi-pencil "></i>}
        </div>
      );
    }
  }
}
StdInput.defaultProps = {
  type: "text",
  enabled: false,
  value:"",
};

class StdTextBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="text"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdPwdBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="password"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDateBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="date"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdTimeBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="time"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDateTimeBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="datetime-local"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdEmailBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="email"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdNumberBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="number"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
          min = {this.props.min}
          max = {this.props.max}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

class StdDropDownBox extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: "",
    options: this.props.options? this.props.options : [],
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value ? this.props.options.find((option) => option.value == this.props.value).label : "",
    });
  }

  onChange = (e) => {
    if(this.props.allowManualEntry){
      
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
    }
  };

  dropdownSelect = (option) =>{
    this.setState({
      newValue: option.label,
    });
    this.props.updateValue(option.value);
  }
  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput dropdown"
          type="dropdown"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        <div className="dropdownWrapper">
          <div className="dropdown">
          {this.props.options.map((option,index) => {
            return <div className="dropdownOptions" key={index} onClick ={()=>this.dropdownSelect(option)}>{option.label}</div>;
          })}
          </div>
        </div>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}
StdDropDownBox.defaultProps = {
  allowManualEntry: false,
}

class StdMultiSelect extends React.Component {
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value.length > 0 ? this.props.options.find((option) => option.value === this.props.value).label : [],
    options: this.props.options? this.props.options : [],
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value > 0 ? this.props.options.find((option) => option.value === this.props.value).label : [],
    });
  }

  onChange = (e) => {
    if(this.props.allowManualEntry){
      
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
    }
  };

  dropdownSelect = (option) =>{
    let selected = this.props.value;
    let selectedDisplay = this.props.value.map(selected =>  selected.label);
    if(selected.includes(option)){
      selected = selected.filter((value) => value.value !== option.value);
      selectedDisplay = selected.map(select => select.label);
    }else{
      selected.push(option);
      selectedDisplay.push(option.label);
    }
    
    console.log(selected);
    console.log(selectedDisplay);
    this.setState({
      newValue: selectedDisplay,
    });
    this.props.updateValue(selected);
  }
  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput dropdown"
          type="dropdown"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        <div className="dropdownWrapper">
          <div className="dropdown">
          {this.props.options.map((option,index) => {
            return <div className={"dropdownOptions " + (this.state.newValue.includes(option.label) ? "active" : "")} key={index} onClick ={()=>this.dropdownSelect(option)}>
              {option.label}
              </div>;
          })}
          </div>
        </div>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}


class StdQRBox extends React.Component{
  state = {
    valueChanged: false,
    value: this.props.value,
    newValue: this.props.value,
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value,
    });
  }

  onChange = (e) => {
    this.setState({
      newValue: e.target.value,
    });
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <div
        className={
          "stdInputGroup d-flex align-items-center" +
          " " +
          (this.state.valueChanged ? "leftBorderRadius" : "borderRadius")
        }
      >
        <input
          className="stdInput"
          type="text"
          ref={this.primaryInput}
          autoComplete={this.props.autoComplete}
          placeholder={""}
          onChange={(e) => this.onChange(e)}
          value={this.state.newValue}
        ></input>
        {this.props.showIndicator ? (
          this.state.editable ? (
            <i className="bi bi-pencil "></i>
          ) : (
            <svg
              className="editLock"
              viewBox="0 0 30 30"
              preserveAspectRatio={"xMidYMid meet"}
            >
              <path
                className={"lockBody"}
                d={
                  "M 10 10 L 20 10 Q 25 10 25 15 V 25 Q 25 30 20 30 H 10 Q 5 30 5 25 V 15 Q 5 10 10 10 H 25 "
                }
              ></path>
              <path
                d={
                  "M 15 20 L 15 20 L 14 19.8 L 13 23 L 17 23 L 16 19.8 L 15 20 A 1 1 0 0 0 15 15 A 1 1 0 0 0 15 20"
                }
                className={"keyHole"}
              ></path>
              <path
                className="bolt"
                fill={"none"}
                d={"M 20 20 V 8 A 1 1 0 0 0 10 8 V 10"}
              ></path>
            </svg>
          )
        ) : (
          ""
        )}
         
      </div>
    );
  }
}