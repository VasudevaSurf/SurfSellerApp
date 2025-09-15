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
import {BorderRadius, Spacing} from '../../../../../config/globalStyles';
import ChatIcon from '../../../../../assets/icons/ChatIcon';
import BusinessProfileIcon from '../../../../../assets/icons/BusinessProfileIcon';

const FAQScreen = () => {
  const [searchText, setSearchText] = useState('');

  const faqCategories = [
    {
      heading: 'About Surf',
      items: [
        {
          label: 'What is Surf and What Are the Benefits of Selling on It?',
          id: 'about_surf',
        },
      ],
    },
    {
      heading: 'Seller Registration',
      items: [
        {
          label: 'How do I register as a seller on Surf?',
          id: 'seller_register',
        },
        {label: 'What documents are required to register?', id: 'seller_docs'},
        {label: 'Is there a registration fee?', id: 'seller_fee'},
        {
          label: 'How long does the approval process take?',
          id: 'seller_approval',
        },
        {label: 'Can I register without a VAT number?', id: 'seller_vat'},
      ],
    },
    {
      heading: 'Product Listing Requirements',
      items: [
        {label: 'How do I upload products?', id: 'product_upload'},
        {
          label: 'What categories of products can I sell on Surf?',
          id: 'product_categories',
        },
        {
          label: 'Can I sell thrifted or second-hand items on Surf?',
          id: 'product_thrift',
        },
        {
          label:
            'I am a Maltese artisan. Can I list and sell my products made in Malta? How will my products be differentiated?',
          id: 'product_madeinmalta',
        },
        {
          label:
            'What is the minimum quantity I need to start selling on Surf?',
          id: 'product_quantity',
        },
        {label: 'What are the product listing rules?', id: 'product_rules'},
        {
          label: 'What if I get flagged for incorrect content?',
          id: 'product_flagged',
        },
        {label: 'How can I avoid penalties?', id: 'product_penalties'},
      ],
    },
    {
      heading: 'Image and Description Requirements',
      items: [
        {
          label: 'What are the image and description requirements?',
          id: 'image_requirements',
        },
      ],
    },
    {
      heading: 'Bulk Upload',
      items: [{label: 'Is there a bulk upload option?', id: 'bulk_upload'}],
    },
    {
      heading: 'Surf vs. Your Own Website',
      items: [
        {
          label: 'I already have a website, so why should I join Surf?',
          id: 'why_surf',
        },
      ],
    },
    {
      heading: 'Orders, Delivery, and Notifications',
      items: [
        {label: 'How do I get notified of an order?', id: 'order_notify'},
        {label: 'How do pickups work?', id: 'order_pickup'},
        {label: 'What if the buyer cancels the order?', id: 'order_cancel'},
      ],
    },
    {
      heading: 'Payments and Fees',
      items: [
        {label: 'When do I get paid?', id: 'payment_time'},
        {label: 'Are there any hidden charges?', id: 'payment_charges'},
        {label: 'How do I update my bank details?', id: 'payment_bank'},
        {label: 'Where can I view payment history?', id: 'payment_history'},
        {label: 'What if there’s a payout delay?', id: 'payment_delay'},
      ],
    },
    {
      heading: 'Discounts and Promotions',
      items: [{label: 'How do I run a discount?', id: 'discount_run'}],
    },
    {
      heading: 'Seller Dashboard & Support',
      items: [
        {
          label: 'Is there a seller dashboard help section?',
          id: 'dashboard_help',
        },
        {label: 'Dashboard not loading?', id: 'dashboard_issue'},
        {label: 'Error uploading images?', id: 'dashboard_upload_error'},
      ],
    },
    {
      heading: 'Contact Seller Support',
      items: [
        {label: 'How do I contact seller support?', id: 'contact_support'},
      ],
    },
  ].map(section => ({
    ...section,
    items: section.items.map((item, index) => ({
      ...item,
      label: `${index + 1}. ${item.label}`,
      onPress: () => navigate('FaqAnswer', {questionId: item.id}),
    })),
  }));

  const filteredCategories = faqCategories
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      ),
    }))
    .filter(section => section.items.length > 0);

  // const faqCategories = [
  //   {
  //     id: 1,
  //     title: 'Product Listing & Requirements',
  //     items: [
  //       {id: 1, label: 'How do I list a new product on the app?'},
  //       {
  //         id: 2,
  //         label: 'What are the image requirements for product listings?',
  //       },
  //       {id: 3, label: 'Can I edit my product details after listing?'},
  //       {id: 4, label: 'What should I include in the product description?'},
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Pricing & Payments',
  //     items: [
  //       {id: 1, label: 'How should I price my product?'},
  //       {
  //         id: 2,
  //         label: 'Does the app charge any listing fees or commissions?',
  //       },
  //       {id: 3, label: 'How do I receive payments from buyers?'},
  //       {id: 4, label: 'How often will I receive my payments?'},
  //       {
  //         id: 5,
  //         label:
  //           'Can I offer discounts, coupons, or promotions on my products?',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'Shipping & Delivery',
  //     items: [
  //       {id: 1, label: 'Who handles the shipping—me or the platform?'},
  //       {
  //         id: 2,
  //         label: 'Does the app charge any listing fees or commissions?',
  //       },
  //       {id: 3, label: 'How do I receive payments from buyers?'},
  //       {id: 4, label: 'How often will I receive my payments?'},
  //     ],
  //   },
  // ];

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
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={[
          {
            isBadge: true,
            text: 'Chat With Us',
            badgeType: BadgeType.PRIMARY,
            badgeVariant: BadgeVariant.FILLED,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'ChatScreen'},
              });
            },
            customContainerStyle: {
              borderRadius: Spacing.Small,
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(3),
              shadowColor: '#101828',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 0.08,
              shadowRadius: 15,
              elevation: 6,
            },
            textVariant: TypographyVariant.H6_BOLD,
            // customTextColor: ColorPalette.PURPLE_300,
            leftIcon: ChatIcon,
            iconSize: 26,
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
          {filteredCategories.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.containerStyle}>
              {/* Section Heading */}
              {section.heading && (
                <Typography
                  variant={TypographyVariant.LMEDIUM_EXTRABOLD}
                  text={section.heading}
                  customTextStyles={{
                    marginBottom: getScreenHeight(1),
                    paddingLeft: getScreenWidth(3),
                  }}
                />
              )}

              {/* Section Container */}
              <View style={styles.menuContainer}>
                {section.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    label={item.label}
                    // leftIcon={item.leftIcon}
                    // rightIcon={item.rightIcon}
                    onPress={item.onPress}
                    textStyle={{
                      color: ColorPalette.GREY_TEXT_500,
                      fontSize: 16,
                    }}
                    variant={TypographyVariant.PMEDIUM_MEDIUM}
                    contentStyle={{gap: getScreenWidth(4)}}
                    showBottomBorder={true}
                    isLastItem={index === section.items.length - 1}
                  />
                ))}
              </View>
            </View>
          ))}

          {/* {faqCategories.map(category => (
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
          ))} */}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.floatingChatButton} onPress={handleChat}>
        <MessageIcon size={24} style={undefined} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FAQScreen;
