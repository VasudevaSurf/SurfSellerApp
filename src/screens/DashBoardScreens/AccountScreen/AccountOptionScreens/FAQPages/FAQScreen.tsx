import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../../../assets/icons/ArrowRightIcon';
import MessageIcon from '../../../../../assets/icons/MessageIcon';
import { MenuItem } from '../../../../../components/MainComponents/MenuItem/MenuItem';
import { Header } from '../../../../../components/UserComponents/Header/Header';
import { SearchBox } from '../../../../../components/UserComponents/SearchBox/SearchBox';
import { Typography } from '../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../../navigation/utils/navigationRef';
import { styles } from './FAQScreen.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../components/UserComponents/Badges/Badge.types';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';
import ChatIcon from '../../../../../assets/icons/ChatIcon';
import BusinessProfileIcon from '../../../../../assets/icons/BusinessProfileIcon';
import { TextButton } from '../../../../../components/UserComponents/TextButton';
import { Fonts } from '../../../../../config/fonts';

export const faqData = [
  // --- Answer 1: What is Surf... ---
  {
    id: 1,
    question: 'What is Surf and What Are the Benefits of Selling on It?',
    answer: [
      {
        type: 'text',
        content:
          "Surf is an eCommerce platform built specifically for Malta, designed to help local businesses sell their products online with ease. Whether you're a small business, independent seller, or a retail brand, Surf provides everything you need to start selling online—without the need for technical expertise or expensive setup.",
      },
      {
        type: 'group', // New group type
        content: [
          {
            type: 'sub_question',
            title: 'Why Sell on Surf? – Key Benefits for Sellers',
            content:
              'Surf is designed to make online selling simple, fair, and accessible for businesses in Malta. Here’s how Surf supports you as a seller:',
          },
          {
            type: 'bullet_list',
            items: [
              {
                title: 'No Upfront Costs:',
                content:
                  'There are no listing fees. You can add your products to Surf completely free of charge.',
              },
              {
                title: 'Instant Local Exposure:',
                content:
                  'Get immediate access to a growing customer base across Malta.',
              },
              {
                title: 'Easy Order Management:',
                content:
                  'From orders and payments to customer communication, everything is handled through one simple dashboard.',
              },
              {
                title: 'Marketing Support:',
                content:
                  'Surf actively promotes sellers through social media, and influencers marketing—so you get discovered faster.',
              },
              {
                title: 'Fair Competition:',
                content:
                  'The platform levels the playing field, giving small and independent businesses the same visibility as larger sellers.',
              },
              {
                title: 'Transparent Pricing:',
                content:
                  'No hidden fees. You only pay a fixed low commission when you make a sale.',
              },
            ],
          },
          {
            type: 'link',
            text: 'Refer to our pricing plans here',
            url: 'https://sell.surf.mt/pricing',
          },
        ],
      },
    ],
  },

  // --- Answer 2: How do I register... ---
  {
    id: 2,
    question: 'How do I register as a seller on Surf?',
    answer: [
      {
        type: 'text_with_inline_link',
        content:
          'You can register by %LINK% and filling in a simple form with your business details. Once submitted, our team will review your application and get in touch for the next steps.',
        linkText: 'Clicking Here',
        url: 'https://sell.surf.mt/register',
      },
    ],
  },

  // --- Answer 3: What information is required... ---
  {
    id: 3,
    question: 'What information is required to register?',
    answer: [
      {
        type: 'group',
        content: [
          {
            type: 'text',
            content:
              'To register as a seller on Surf, you must provide the following information:',
          },
          {
            type: 'bullet_list',
            items: [
              'First Name',
              'Last Name',
              'Business Name',
              'Email Address',
              'VAT Number',
              'Store Address',
              'City',
              'WhatsApp Number (used for seller communication and order coordination)',
            ],
          },
          {
            type: 'text',
            content:
              'To successfully create a seller account with Surf, you must provide a valid VAT number. This can be either a **Self-Employed VAT** or a **Business VAT**. Supplying this information ensures compliance with local regulations and enables us to verify your business for payments and invoicing purposes.',
          },
        ],
      },
    ],
  },
];




const FAQScreen = () => {
  const [searchText, setSearchText] = useState('');

  const filteredCategories = faqData
    .filter(q =>
      q.question.toLowerCase().includes(searchText.toLowerCase()),
    )
    .filter(q => q.question.length > 0);

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
      params: { screen: 'ChatScreen' },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="FAQ"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={[
          {
            isBadge: true,
            text: 'Chat With Us',
            badgeType: BadgeType.PRIMARY,
            badgeVariant: BadgeVariant.FILLED,
            onPress: handleChat,
            customContainerStyle: {
              borderRadius: Spacing.Small,
              paddingVertical: getScreenHeight(1.2),
              paddingHorizontal: getScreenWidth(3),
              shadowColor: '#101828',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.08,
              shadowRadius: 15,
              elevation: 6,
            },
            textVariant: TypographyVariant.PMEDIUM_SEMIBOLD,
            // customTextColor: ColorPalette.PURPLE_300,
            leftIcon: ChatIcon,
            iconSize: 24,
          },
        ]}
      />
      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Queries"
        />
      </View>
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerStyle}>
            {filteredCategories.map((q) => (
              <View key={q.id} >
                <MenuItem
                  key={q.id}
                  label={q.question}
                  onPress={() => navigate('FAQAnswer', { questionId: q.id })}
                  textStyle={{
                    color: ColorPalette.GREY_TEXT_500,
                  }}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  contentStyle={{ gap: getScreenWidth(4) }}
                // showBottomBorder={true}
                />
              </View>
            ))}
          </View>


        </ScrollView>
        <View style={styles.ChatWithUsContainer}>
          <Typography
            text="Need more info?"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.captionTwo}
          />
          <TextButton
            text="Chat with us now!"
            onPress={handleChat}
            variant={TypographyVariant.PMEDIUM_SEMIBOLD}
            underline
            customTextStyles={{
              color: ColorPalette.ProgressLine,
              fontFamily: Fonts.POPPINS_BOLD,
            }}
          />
        </View>
      </View>

      {/* <TouchableOpacity style={styles.floatingChatButton} onPress={handleChat}>
        <MessageIcon size={24} style={undefined} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default FAQScreen;
