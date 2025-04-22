import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../../../assets/icons/ArrowRightIcon';
import MessageIcon from '../../../../../assets/icons/MessageIcon';
import {MenuItem} from '../../../../../components/MainComponents/MenuItem/MenuItem';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {styles} from './FAQScreen.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../components/UserComponents/Badges/Badge.types';
import {Spacing} from '../../../../../config/globalStyles';

const FAQScreen = () => {
  const [searchText, setSearchText] = useState('');

  const faqCategories = [
    {
      id: 1,
      title: 'Product Listing & Requirements',
      items: [
        {id: 1, label: 'How do I list a new product on the app?'},
        {
          id: 2,
          label: 'What are the image requirements for product listings?',
        },
        {id: 3, label: 'Can I edit my product details after listing?'},
        {id: 4, label: 'What should I include in the product description?'},
      ],
    },
    {
      id: 2,
      title: 'Pricing & Payments',
      items: [
        {id: 1, label: 'How should I price my product?'},
        {
          id: 2,
          label: 'Does the app charge any listing fees or commissions?',
        },
        {id: 3, label: 'How do I receive payments from buyers?'},
        {id: 4, label: 'How often will I receive my payments?'},
        {
          id: 5,
          label:
            'Can I offer discounts, coupons, or promotions on my products?',
        },
      ],
    },
    {
      id: 3,
      title: 'Shipping & Delivery',
      items: [
        {id: 1, label: 'Who handles the shipping—me or the platform?'},
        {
          id: 2,
          label: 'Does the app charge any listing fees or commissions?',
        },
        {id: 3, label: 'How do I receive payments from buyers?'},
        {id: 4, label: 'How often will I receive my payments?'},
      ],
    },
  ];

  const handleChat = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {screen: 'ChatScreen'},
    });
  };

  const headerIcons = useMemo(
    () => [
      {
        icon: QuestionMarkIcon,
        onPress: () => console.log('Question mark pressed'),
        size: 24,
        color: ColorPalette.Black,
        strokeWidth: 2,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="How can we help?"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        rightIcons={[
          {
            isBadge: true,
            text: 'Chat with us',
            badgeType: BadgeType.PRIMARY,
            badgeVariant: BadgeVariant.FILLED,
            onPress: () => {},
            customContainerStyle: {
              borderColor: ColorPalette.ProgressLine,
              borderRadius: Spacing.XSmall,
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(2),
            },
            textVariant: TypographyVariant.LMEDIUM_MEDIUM,
            customTextColor: ColorPalette.PRIMARY_500,
            leftIcon: MessageIcon,
            iconSize: 16,
          },
        ]}
      />
      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search your queries"
        />
      </View>
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}>
          {faqCategories.map(category => (
            <View key={category.id} style={styles.categoryContainer}>
              <View style={styles.titleContainer}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_EXTRABOLD}
                  text={category.title}
                  customTextStyles={styles.categoryTitle}
                />
              </View>
              <View style={styles.faqItemsContainer}>
                {category.items.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    label={item.label}
                    onPress={() => {}}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    showBottomBorder
                    containerStyle={styles.menuItemContainer}
                    textStyle={styles.menuItemText}
                    rightIcon={
                      <ArrowRightIcon
                        style={undefined}
                        color={ColorPalette.GREY_TEXT_500}
                      />
                    }
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.floatingChatButton} onPress={handleChat}>
        <MessageIcon size={24} style={undefined} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FAQScreen;
