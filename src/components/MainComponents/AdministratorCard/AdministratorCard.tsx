import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {Badge} from '../../UserComponents/Badges/Badge';
import {BadgeType, BadgeVariant} from '../../UserComponents/Badges/Badge.types';
import {styles} from './AdministratorCard.styles';
import EditIcon from '../../../assets/icons/FlowBite';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {RootState, AppDispatch} from '../../../redux/store';
import {fetchProfile} from '../../../redux/slices/profileSlice';

export interface Administrator {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Owner' | 'Admin';
  registeredDate: string;
  type: string;
}

interface AdministratorCardProps {
  administrator: Administrator;
  onEdit: (administrator: Administrator) => void;
  isCurrentUser?: boolean; // New prop to identify if this is the current user
}

export const AdministratorCard: React.FC<AdministratorCardProps> = ({
  administrator,
  onEdit,
  isCurrentUser = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading} = useSelector(
    (state: RootState) => state.profile,
  );

  // Fetch profile data if this is the current user
  useEffect(() => {
    if (isCurrentUser && userData?.user_id && !profileData) {
      dispatch(fetchProfile(userData.user_id));
    }
  }, [isCurrentUser, userData?.user_id, profileData, dispatch]);

  // Use profile data if available and this is the current user
  const displayData =
    isCurrentUser && profileData
      ? {
          ...administrator,
          fullName:
            `${profileData.firstname || ''} ${
              profileData.lastname || ''
            }`.trim() || administrator.fullName,
          email: profileData.email || administrator.email,
          phone: profileData.phone || administrator.phone,
        }
      : administrator;

  const getRoleBadgeType = (role: string): BadgeType => {
    return role === 'Owner' ? BadgeType.PRIMARY : BadgeType.SECONDARY;
  };

  const getRoleBackgroundColor = (role: string): string => {
    return role === 'Owner'
      ? 'rgba(145, 1, 207, 0.10)'
      : 'rgba(255, 50, 106, 0.10)';
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.roleContainer}>
          <Badge
            text={displayData.role}
            type={getRoleBadgeType(displayData.role)}
            variant={BadgeVariant.FILLED}
            customContainerStyle={{
              backgroundColor: getRoleBackgroundColor(displayData.role),
              paddingVertical: getScreenHeight(1),
              paddingHorizontal: getScreenWidth(3),
              alignSelf: 'flex-start',
            }}
            textVariant={TypographyVariant.LSMALL_BOLD}
            customTextColor={
              displayData.role === 'Owner'
                ? ColorPalette.PURPLE_300
                : ColorPalette.PURPLE_ROSE_300
            }
          />
          <Typography
            text={displayData.name}
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={styles.nameText}
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(displayData)}>
          <EditIcon size={20} color={ColorPalette.PURPLE_300} />
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Typography
            text="Full name"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.fullName || 'Not provided'}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>

        <View style={styles.detailRow}>
          <Typography
            text="Email ID"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.email}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>

        <View style={styles.detailRow}>
          <Typography
            text="WhatsApp number"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.phone || 'Not provided'}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>

        <View style={styles.detailRow}>
          <Typography
            text="Role"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.role}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>

        <View style={styles.detailRow}>
          <Typography
            text="Registered"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.registeredDate}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>

        <View style={styles.detailRow}>
          <Typography
            text="Type"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.labelText}
          />
          <Typography
            text={displayData.type}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>
      </View>
    </View>
  );
};
