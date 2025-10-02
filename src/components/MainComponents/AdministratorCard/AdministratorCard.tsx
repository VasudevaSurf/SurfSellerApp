import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {Badge} from '../../UserComponents/Badges/Badge';
import {BadgeType, BadgeVariant} from '../../UserComponents/Badges/Badge.types';
import {styles} from './AdministratorCard.styles';
import EditIcon from '../../../assets/icons/FlowBite';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

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
}

export const AdministratorCard: React.FC<AdministratorCardProps> = ({
  administrator,
  onEdit,
}) => {
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
            text={administrator.role}
            type={getRoleBadgeType(administrator.role)}
            variant={BadgeVariant.FILLED}
            customContainerStyle={{
              backgroundColor: getRoleBackgroundColor(administrator.role),
              paddingVertical: getScreenHeight(1),
              paddingHorizontal: getScreenWidth(3),
              alignSelf: 'flex-start',
            }}
            textVariant={TypographyVariant.LSMALL_BOLD}
            customTextColor={
              administrator.role === 'Owner'
                ? ColorPalette.PURPLE_300
                : ColorPalette.PURPLE_ROSE_300
            }
          />
          <Typography
            text={administrator.name}
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={styles.nameText}
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(administrator)}>
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
            text={administrator.fullName}
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
            text={administrator.email}
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
            text={administrator.phone}
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
            text={administrator.role}
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
            text={administrator.registeredDate}
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
            text={administrator.type}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={styles.valueText}
          />
        </View>
      </View>
    </View>
  );
};
