import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  BrowseScreenNavigationProps,
  BrowseScreenRouteProps,
} from '../Interfaces';
import {useStringfyRentalType} from '../Hooks';

type BrowseScreenProps = {
  route: BrowseScreenRouteProps;
  navigation: BrowseScreenNavigationProps;
};

interface RowProps {
  label: string;
  content: string;
}

const Row = ({label, content}: RowProps) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, styles.text16]}>{label}</Text>
      <Text style={[styles.content, styles.text14]}>{content}</Text>
    </View>
  );
};

const Devider = () => <View style={styles.devider} />;

const BrowseScreen = ({route, navigation}: BrowseScreenProps) => {
  const [item, setItem] = useState(route.params);
  if (item) {
    return (
      <ScrollView>
        <View
          style={{
            alignSelf: 'stretch',
            height: 240,
            backgroundColor: '#C4C4C4',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>사진</Text>
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.row}>
            <Text style={[styles.label, styles.text16]}>임대조건</Text>
            <View style={styles.content}>
              <Text style={styles.text20}>{useStringfyRentalType(item)}</Text>
              {item.managementFee !== 0 && (
                <Text style={styles.text12}>
                  (관리비 {item.managementFee / 10000}만원)
                </Text>
              )}
            </View>
          </View>
          <Row label="주소" content={item.address} />
          <View
            style={{
              alignSelf: 'stretch',
              height: 180,
              margin: 20,
              backgroundColor: '#C4C4C4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>지도</Text>
          </View>
          <Text style={[styles.sectionLabel, styles.text18]}>구조/면적</Text>
          <Row
            label="층/건물층수"
            content={`${item.floor.evaluations[item.floor.idx]}/${
              item.roofFloor.evaluations[item.roofFloor.idx]
            }`}
          />
          <Row
            label="구조"
            content={item.roomStructure.evaluations[item.roomStructure.idx]}
          />
          <Row label="전용면적" content={`${item.size}평`} />
          {item.sturctureEvaluationFactors.map((factor, index) => (
            <Row
              key={`sturctureEvaluationFactor-${index}`}
              label={factor.name}
              content={factor.evaluations[factor.idx]}
            />
          ))}
          <Devider />
          <Text style={[styles.sectionLabel, styles.text18]}>옵션/환경</Text>
          <Row
            label="옵션"
            content={
              item.options
                .filter(item => item.available)
                .map(item => item.name)
                .join(', ') || '없음'
            }
          />
          {item.environmentEvaluationFactors.map((factor, index) => (
            <Row
              key={`environmentEvaluationFactors-${index}`}
              label={factor.name}
              content={factor.evaluations[factor.idx]}
            />
          ))}
          <Devider />
          <Text style={[styles.sectionLabel, styles.text18]}>메모</Text>
          <View
            style={{
              alignSelf: 'stretch',
              minHeight: 100,
              margin: 20,
              padding: 10,
              backgroundColor: '#FBFBFB',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#DDE1E5',
            }}>
            <Text>{item.memo}</Text>
          </View>
          <Devider />
          <Text style={[styles.sectionLabel, styles.text18]}>공인중개사</Text>
          <Row label="상호명" content={item.realtorName} />
          <Row label="연락처" content={item.realtorTel} />
        </View>
      </ScrollView>
    );
  } else {
    console.error('cannot find note');
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 6,
  },
  label: {
    flex: 4,
  },
  content: {
    flex: 6,
  },
  sectionLabel: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: '600',
  },
  text20: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  text18: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
  },
  text16: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  text14: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  text12: {
    fontSize: 12,
    fontWeight: '500',
  },
  devider: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 30,
    marginVertical: 15,
  },
});

export default BrowseScreen;
