import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ArrayItems, Data, Items } from '../hooks/mock';
import Colors from '../styles/Colors';
import TermsOfServiceStyles from '../styles/StyleSheet/termsOfServiceStyles';


const TermsOfService = () => {
  return (
    <View style={TermsOfServiceStyles.container}>
      <Text style={TermsOfServiceStyles.termStyle}>
        For good and valuable consideration, the receipt and legal sufficiency
        of which are hereby expressly acknowledged, the parties hereto agree as
        follows:
      </Text>
      <Text style={TermsOfServiceStyles.heading}>1 Professional service</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Following are the list of service that service provider can provide to
        the company:
      </Text>
      {Data.map(item => {
        return (
          <Text style={[TermsOfServiceStyles.termStyle, {marginVertical: moderateScale(10)}]}>
            {item.id}
            {'.  '}
            {item.title}
          </Text>
        );
      })}
      <Text style={TermsOfServiceStyles.termStyle}>
        You may refer to the following website link of the service provider for
        a detailed list of services:{'\n'}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.businessfinancialgroup.biz/services/');
          }}>
          <Text style={{color: Colors.blue, fontSize: moderateScale(10)}}>
            https://www.businessfinancialgroup.biz/services/
          </Text>
        </TouchableOpacity>
      </Text>
      <Text style={TermsOfServiceStyles.heading}>2. General Service Provisions:</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        As per the choice of the service/s, the company may be required to sign
        additional combined or separate engagements for the services mentioned
        above. {'\n'}The service provider will not provide audited monthly
        financial statements. {'\n'}Management is responsible for implementing
        and maintaining internal controls to avoid employee thefts and errors.{' '}
        {'\n'} Management is responsible to provide all required documents and
        related information to the service provider.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>3. Service Fee</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        If there are matters that arise which are outside the scope of the above
        services, we will bill hourly. Naturally, we will inform you ahead of
        time should such billing be required.
      </Text>
      <Text style={[TermsOfServiceStyles.heading, {fontSize: moderateScale(12)}]}>
        Hourly Billing Rate
      </Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Junior Accountant $75 {'\n'}Senior Accountant $95{'\n'}Partner $125
        {'\n'}CPA Services $175
      </Text>
      <Text style={[TermsOfServiceStyles.termStyle, {marginTop: moderateScale(10)}]}>
        Most of the services are priced at a fixed fee. The fixed price is
        estimated based on our hourly rates. The detailed service fees are
        listed on the service provider’s website{'\n'}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.businessfinancialgroup.biz/price/');
          }}>
          <Text style={{color: Colors.blue, fontSize: moderateScale(10)}}>
            https://www.businessfinancialgroup.biz/price/
          </Text>
        </TouchableOpacity>
        Hourly rates and service fees are subject to change without notice.{' '}
        {'\n'} {'\n'}A deposit is required before starting any project. The
        service provider will send the bill to the company on a weekly basis,
        normally on Monday for the time accrued for the previous week. In
        certain circumstances, the billing will be on a monthly or quarterly
        basis.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>4. EFT Authorization</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        For efficiency and to keep fees down, we will process your invoices
        within five (5) business days from the invoice date through ACH.{'\n'}{' '}
        {'\n'}This information is kept strictly confidential.{'\n'} {'\n'}The
        company understands that this authority is to remain in full force and
        effect until notifying the Business Financial Group to cancel it in such
        time as to afford Business Financial Group a reasonable opportunity to
        act on it. The company has the right to stop payment of an automatic
        payment by notification to the service provider (5) business days before
        my account is to be charged. The company further agrees that any
        Payments returned NSF or Unpaid shall be subject to a Return Fee of $50
        and that the company’s account may be electronically debited to recover
        both the Returned Payment and the Return Fee.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>5. Fees and Payment Requirements.</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Service Provider will invoice Company for the Services performed
        hereunder on a weekly, monthly, or quarterly basis at the firm's current
        hourly rate, plus such other out-of-pocket costs incurred by Service
        Provider as shall be separately stated. Each invoice shall set forth a
        reasonable explanation of the services rendered during such a period
        and, if requested by the Company, supporting documentation in reasonable
        detail. The company will pay each invoice in full no later than the five
        (5) days following the date of the invoice. Each party shall be
        responsible for paying all taxes, if any, imposed upon it by applicable
        law in connection with this Agreement.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>6. Confidentiality</Text>
      <Text style={[TermsOfServiceStyles.termStyle, {color: Colors.gray}]}>
        Service Provider will invoice Company for the Services performed
        hereunder on a weekly, monthly, or quarterly basis at the firm's current
        hourly rate, plus such other out-of-pocket costs incurred by Service
        Provider as shall be separately stated. Each invoice shall set forth a
        reasonable explanation of the services rendered during such a period
        and, if requested by the Company, supporting documentation in reasonable
        detail. The company will pay each invoice in full no later than the five
        (5) days following the date of the invoice. Each party shall be
        responsible for paying all taxes, if any, imposed upon it by applicable
        law in connection with this Agreement.
      </Text>
      {Items.map(item => {
        return (
          <View>
            <Text style={TermsOfServiceStyles.heading}>
              {item.id}
              {'  '}
              <Text style={TermsOfServiceStyles.termStyle}>{item.title}</Text>
              {'\n'}
            </Text>
            {item.child.map(subItem => {
              return (
                <Text
                  style={[
                    TermsOfServiceStyles.termStyle,
                    {marginVertical: moderateScale(10)},
                  ]}>
                  {subItem.id}
                  {'.  '}
                  {subItem.title}
                </Text>
              );
            })}
          </View>
        );
      })}
      <Text style={TermsOfServiceStyles.heading}>7. Assignment/ Successors</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Neither Party hereto may assign this Agreement or any rights hereunder
        to any other person, without the prior written consent of the other
        party hereto. This Agreement shall be binding upon and inure to the
        benefit of the successors of the parties hereto.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>8. Waiver of Breach</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        The failure of any party hereto to enforce at any time any of the
        provisions of this Agreement shall in no way be construed to constitute
        a waiver of any such provision nor in any way to affect the validity of
        this Agreement or any part thereof, including the right of any party
        thereafter to enforce each and every provision. The waiver by any party
        to this Agreement or any breach or violation of any provision of this
        Agreement by the other party hereto shall not operate or be construed to
        be a waiver of any subsequent breach or violation thereof.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>9. Severability</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        The terms and conditions of this Agreement are hereby deemed by the
        parties to be severable, and the invalidity or unenforceability of any
        one or more of the provisions of this Agreement shall not affect the
        validity and enforceability of the other provisions hereof.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>10. Notices</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Any notice contemplated by or required or permitted to be given under
        this Agreement shall be in writing and sent by telecopier, with a copy
        promptly sent by first class mail, or delivered personally, or sent by
        next day or overnight courier or delivery, or mailed by registered or
        certified mail, return receipt requested, postage prepaid, as follows:
        {'\n'}Business Financial Group{'\n'}Att: Operations Manager{'\n'}5051
        Peachtree Corners Circle{'\n'}Suite 200{'\n'}Peachtree Corners,GA 30093
        Fax# 678-302-9154{'\n'}
        {'\n'}
        {'\n'}Or, in each case, at such other address or facsimile number as may
        be specified in writing to the other parties hereto. Such notices,
        requests and other communications sent as provided hereinabove shall be
        effective: if sent by telecopier on a business day between the hours of
        9 AM and 4 PM Eastern time, upon sending, but if sent by telecopier at
        any other time, upon the next business day; upon receipt, when
        personally delivered; the next business day, if sent by overnight
        courier or delivery; and if sent by registered or certified mail, return
        receipt requested, upon the expiration of the fifth business day after
        being deposited in the USPS mail.
      </Text>
      {ArrayItems.map(item => {
        return (
          <View>
            <Text style={TermsOfServiceStyles.heading}>
              {item.id}
              {'  '}
              <Text style={TermsOfServiceStyles.termStyle}>{item.title}</Text>
              {'\n'}
            </Text>
            {item.child.map(subItem => {
              return (
                <Text
                  style={[
                    TermsOfServiceStyles.termStyle,
                    {
                      marginVertical: moderateScale(10),
                      fontFamily: 'Lato-Bold',
                      color: Colors.blackWithOpacity,
                    },
                  ]}>
                  {subItem.id}
                  {'.  '}
                  <Text style={TermsOfServiceStyles.termStyle}>{subItem.title}</Text>
                </Text>
              );
            })}
          </View>
        );
      })}
      <Text style={TermsOfServiceStyles.heading}>14. Term and Termination</Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        1. The term of this Agreement shall commence on the first date indicated
        above and shall terminate at the close of business on the first
        anniversary of the date hereof.{'\n'}
        {'\n'}2. Either party may, by delivering written notice thereof to the
        other party, terminate any or all of its obligations under this
        Agreement, effective immediately, if the other party hereto:{'\n'}
        {'\n'}i. Is rendered bankrupt or becomes insolvent, and such insolvency
        is not cured within thirty(30) days after written notice, or files a
        written petition in bankruptcy or an answer admitting the material facts
        recited in such petition filed by another, or discontinues its business,
        or has a receiver or other custodian of any kind appointed to administer
        any substantial amount of its property; or
        {'\n'}
        {'\n'}ii. Commits a material breach of its duties, obligations, or
        understandings under this Agreement, which breach is not cured within
        thirty(30) days following written notice of such breach from the
        non-breaching party.{'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        Any such termination shall be in addition to any other rights or
        remedies available at law or in equity to the terminating party.{'\n'}
        {'\n'}
        {'\n'}
        {'\n'}1. Each party hereto agrees to consult in advance with the other
        party and to bring to the attention of the other party any problems,
        differences of opinion, disagreements or any other matters that may lead
        such party to terminate or seek to terminate this Agreement. The purpose
        and intent of the parties in including this provision is to ensure that
        both parties to this Agreement are made aware of any problems arising
        out of or relating to this Agreement or the relationship of the parties
        hereunder, so that the parties hereto may, in good faith, consult with
        one another concerning such problems and, where possible, resolve such
        problems to the parties' mutual satisfaction, thereby preserving their
        contractual relationship and goodwill and mutual respect presently
        existing between the parties to this Agreement.
      </Text>
      <Text style={TermsOfServiceStyles.heading}>
        15. Actions beyond the control of parties(Force Majeure)
      </Text>
      <Text style={TermsOfServiceStyles.termStyle}>
        Any failure or delay in the performance by Service Provider of its
        obligations hereunder shall not be a breach of this Agreement if such
        failure or delay arises out of or results primarily from fire, storm,
        flood, earthquake or other acts of God, explosions, wars, insurrections,
        strikes, work stoppages or slowdowns, epidemic or quarantine
        restrictions, unforeseen equipment failure or inability to obtain
        essential raw materials despite commercially reasonable best efforts to
        do so (the occurrence of any of the foregoing shall be an "Event of
        Force Majeure").
      </Text>
    </View>
  );
};


export default TermsOfService;
