import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OtpRegService } from "../../../services/otpRegService";
import { RegistrationEmailService } from "../../../services/registrationEmailService";
import { ref, set, push } from "firebase/database";
import { realtimeDb } from "../../../lib/firebase";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import { ColorPalette } from "../../../config/colorPalette";

const COUNTRIES = [
  { name: "AF", code: "+93" },
  { name: "AL", code: "+355" },
  { name: "DZ", code: "+213" },
  { name: "AD", code: "+376" },
  { name: "AO", code: "+244" },
  { name: "AR", code: "+54" },
  { name: "AM", code: "+374" },
  { name: "AU", code: "+61" },
  { name: "AT", code: "+43" },
  { name: "AZ", code: "+994" },
  { name: "BH", code: "+973" },
  { name: "BD", code: "+880" },
  { name: "BY", code: "+375" },
  { name: "BE", code: "+32" },
  { name: "BR", code: "+55" },
  { name: "BG", code: "+359" },
  { name: "CA", code: "+1" },
  { name: "CL", code: "+56" },
  { name: "CN", code: "+86" },
  { name: "CO", code: "+57" },
  { name: "CR", code: "+506" },
  { name: "HR", code: "+385" },
  { name: "CY", code: "+357" },
  { name: "CZ", code: "+420" },
  { name: "DK", code: "+45" },
  { name: "EG", code: "+20" },
  { name: "EE", code: "+372" },
  { name: "FI", code: "+358" },
  { name: "FR", code: "+33" },
  { name: "GE", code: "+995" },
  { name: "DE", code: "+49" },
  { name: "GR", code: "+30" },
  { name: "HK", code: "+852" },
  { name: "HU", code: "+36" },
  { name: "IS", code: "+354" },
  { name: "IN", code: "+91" },
  { name: "ID", code: "+62" },
  { name: "IR", code: "+98" },
  { name: "IQ", code: "+964" },
  { name: "IE", code: "+353" },
  { name: "IL", code: "+972" },
  { name: "IT", code: "+39" },
  { name: "JP", code: "+81" },
  { name: "JO", code: "+962" },
  { name: "KZ", code: "+7" },
  { name: "KE", code: "+254" },
  { name: "KW", code: "+965" },
  { name: "LV", code: "+371" },
  { name: "LB", code: "+961" },
  { name: "LT", code: "+370" },
  { name: "LU", code: "+352" },
  { name: "MY", code: "+60" },
  { name: "MT", code: "+356" },
  { name: "MX", code: "+52" },
  { name: "MA", code: "+212" },
  { name: "NL", code: "+31" },
  { name: "NZ", code: "+64" },
  { name: "NG", code: "+234" },
  { name: "NO", code: "+47" },
  { name: "PK", code: "+92" },
  { name: "PH", code: "+63" },
  { name: "PL", code: "+48" },
  { name: "PT", code: "+351" },
  { name: "QA", code: "+974" },
  { name: "RO", code: "+40" },
  { name: "RU", code: "+7" },
  { name: "SA", code: "+966" },
  { name: "SG", code: "+65" },
  { name: "SK", code: "+421" },
  { name: "SI", code: "+386" },
  { name: "ZA", code: "+27" },
  { name: "KR", code: "+82" },
  { name: "ES", code: "+34" },
  { name: "LK", code: "+94" },
  { name: "SE", code: "+46" },
  { name: "CH", code: "+41" },
  { name: "TH", code: "+66" },
  { name: "TR", code: "+90" },
  { name: "AE", code: "+971" },
  { name: "GB", code: "+44" },
  { name: "US", code: "+1" },
  { name: "UA", code: "+380" },
  { name: "VN", code: "+84" },
];

const CATEGORIES_LIST = [
  "Fashion and Apparel",
  "Electronics",
  "Home and Living",
  "Beauty and Personal Care",
  "Sports and Fitness",
  "Toys, Kids and Baby",
  "Automotive",
  "Books and Stationery",
  "Office Supplies",
  "Pet Supplies",
  "Gifts and Lifestyle",
];

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    whatsapp: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.name === "MT") || COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const [showOtp, setShowOtp] = useState({ email: false, whatsapp: false });
  const [verified, setVerified] = useState({ email: false, whatsapp: false });
  const [expectedOtp, setExpectedOtp] = useState<{ email: string | null; whatsapp: string | null }>({
    email: null,
    whatsapp: null,
  });
  const [otpInput, setOtpInput] = useState({ email: "", whatsapp: "" });
  const [loadingOtp, setLoadingOtp] = useState({ email: false, whatsapp: false });

  // Update Field helper
  const updateField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSendOtp = async (type: "email" | "whatsapp") => {
    if (type === "email" && !form.email) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }
    if (type === "whatsapp" && !form.whatsapp) {
      Alert.alert("Error", "Please enter a WhatsApp number");
      return;
    }

    setLoadingOtp(prev => ({ ...prev, [type]: true }));
    let result;
    if (type === "email") {
      result = await OtpRegService.sendEmailOtp(form.email);
    } else {
      const fullPhone = selectedCountry.code + form.whatsapp;
      result = await OtpRegService.sendWhatsAppOtp(fullPhone);
    }
    setLoadingOtp(prev => ({ ...prev, [type]: false }));

    if (result.success && result.otp) {
      setExpectedOtp(prev => ({ ...prev, [type]: result.otp?.toString() }));
      setShowOtp(prev => ({ ...prev, [type]: true }));
      Alert.alert("Sent", `OTP sent to your ${type === 'email' ? 'email' : 'WhatsApp'}`);
    } else {
      Alert.alert("Error", result.error || `Failed to send ${type} OTP`);
    }
  };

  const handleVerifyOtp = (type: "email" | "whatsapp") => {
    const code = otpInput[type];
    if (code === expectedOtp[type]) {
      setVerified(prev => ({ ...prev, [type]: true }));
      setShowOtp(prev => ({ ...prev, [type]: false }));
    } else {
      Alert.alert("Error", "Invalid OTP code. Please try again.");
    }
  };

  const handleCategorySelect = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      if (selectedCategories.length >= 5) {
        Alert.alert("Notice", "You can only select up to 5 categories");
        return;
      }
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleCustomCategory = () => {
    if (!customCategory.trim()) return;
    if (selectedCategories.length >= 5) {
      Alert.alert("Notice", "You can only select up to 5 categories");
      return;
    }
    setSelectedCategories([...selectedCategories, customCategory.trim()]);
    setCustomCategory("");
  };

  const handleSubmit = async () => {
    if (!realtimeDb) {
      Alert.alert("Error", "Database connection error. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    try {
      const sellersRef = ref(realtimeDb, "sellers");
      const newSellerRef = push(sellersRef);

      const sellerData = {
        id: newSellerRef.key,
        firstName: form.firstName,
        lastName: form.lastName,
        businessName: form.businessName,
        email: form.email.toLowerCase().trim(),
        phoneNumber: selectedCountry.code + form.whatsapp,
        country: selectedCountry.name,
        categories: selectedCategories,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        whatsappVerified: true,
        source: "new_registration_flow"
      };

      await set(newSellerRef, sellerData);

      await RegistrationEmailService.sendRegistrationEmail({
        firstName: sellerData.firstName,
        lastName: sellerData.lastName,
        businessName: sellerData.businessName,
        email: sellerData.email,
        whatsapp: sellerData.phoneNumber,
        country: sellerData.country,
        categories: sellerData.categories.join(", "),
        timestamp: new Date().toLocaleString()
      });

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Failed to complete registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = form.firstName && form.lastName && verified.email && verified.whatsapp;
  const isStep2Valid = form.businessName && selectedCategories.length > 0;

  if (isSuccess) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>Registration Successful!</Text>
          <Text style={styles.successDesc}>
            Thank you for joining Surf. Our team will contact you shortly to set up your seller profile.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => currentStep > 1 ? setCurrentStep(1) : navigation.goBack()}
            >
              <ArrowLeftIcon size={24} color={ColorPalette.PURPLE_300} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.stepIndicatorContainer}>
              <Text style={[styles.stepText, currentStep === 1 ? styles.stepActive : styles.stepInactive]}>Account</Text>
              <Text style={styles.stepInactive}> / </Text>
              <Text style={[styles.stepText, currentStep === 2 ? styles.stepActive : styles.stepInactive]}>Business</Text>
            </View>
            <View style={{ width: 60 }} />
          </View>

          <Text style={styles.title}>Sign up and grow your business with Surf</Text>

          {/* Step 1: Account */}
          {currentStep === 1 && (
            <View>
              <View style={styles.row}>
                <View style={styles.inputContainerRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="First name"
                    placeholderTextColor="#999"
                    value={form.firstName}
                    onChangeText={(t) => updateField("firstName", t)}
                  />
                </View>
                <View style={{ width: 10 }} />
                <View style={styles.inputContainerRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    placeholderTextColor="#999"
                    value={form.lastName}
                    onChangeText={(t) => updateField("lastName", t)}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.verifyRow}>
                <TextInput
                  style={[styles.input, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(t) => updateField("email", t)}
                  editable={!verified.email}
                />
                {verified.email ? (
                  <View style={[styles.verifyButton, styles.verifiedBg]}>
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.verifyButton, loadingOtp.email && { opacity: 0.7 }]}
                    onPress={() => handleSendOtp("email")}
                    disabled={loadingOtp.email}
                  >
                    {loadingOtp.email ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
                  </TouchableOpacity>
                )}
              </View>
              {showOtp.email && !verified.email && (
                <View style={styles.otpContainer}>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="Enter OTP"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={otpInput.email}
                    onChangeText={(t) => setOtpInput(prev => ({ ...prev, email: t }))}
                  />
                  <TouchableOpacity style={[styles.otpSubmitBtn, { marginRight: 10, backgroundColor: "#666" }]} onPress={() => handleSendOtp("email")}>
                    <Text style={styles.otpSubmitText}>Resend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.otpSubmitBtn} onPress={() => handleVerifyOtp("email")}>
                    <Text style={styles.otpSubmitText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* WhatsApp */}
              <View style={styles.verifyRow}>
                <TouchableOpacity
                  style={styles.countrySelector}
                  onPress={() => setCountryOpen(true)}
                >
                  <Text style={styles.countryCode}>{selectedCountry.code}</Text>
                  <ArrowDownIcon size={16} color="#000" />
                </TouchableOpacity>

                <TextInput
                  style={[styles.input, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }]}
                  placeholder="WhatsApp number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={form.whatsapp}
                  onChangeText={(t) => updateField("whatsapp", t)}
                  editable={!verified.whatsapp}
                />
                {verified.whatsapp ? (
                  <View style={[styles.verifyButton, styles.verifiedBg]}>
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.verifyButton, loadingOtp.whatsapp && { opacity: 0.7 }]}
                    onPress={() => handleSendOtp("whatsapp")}
                    disabled={loadingOtp.whatsapp}
                  >
                    {loadingOtp.whatsapp ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
                  </TouchableOpacity>
                )}
              </View>
              {showOtp.whatsapp && !verified.whatsapp && (
                <View style={styles.otpContainer}>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="Enter WhatsApp OTP"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={otpInput.whatsapp}
                    onChangeText={(t) => setOtpInput(prev => ({ ...prev, whatsapp: t }))}
                  />
                  <TouchableOpacity style={[styles.otpSubmitBtn, { marginRight: 10, backgroundColor: "#666" }]} onPress={() => handleSendOtp("whatsapp")}>
                    <Text style={styles.otpSubmitText}>Resend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.otpSubmitBtn} onPress={() => handleVerifyOtp("whatsapp")}>
                    <Text style={styles.otpSubmitText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={[styles.primaryButton, !isStep1Valid && styles.disabledButton]}
                onPress={() => {
                  if (!form.firstName.trim() || !form.lastName.trim()) {
                    Alert.alert("Missing Details", "Please fill in both your First Name and Last Name.");
                    return;
                  }
                  if (!verified.email || !verified.whatsapp) {
                    Alert.alert("Verification Needed", "Please verify both your email and WhatsApp number to continue.");
                    return;
                  }
                  setCurrentStep(2);
                }}
              >
                <Text style={styles.primaryButtonText}>Register & Continue</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <View>
              <TextInput
                style={[styles.input, { marginBottom: 15 }]}
                placeholder="Business name"
                placeholderTextColor="#999"
                value={form.businessName}
                onChangeText={(t) => updateField("businessName", t)}
              />

              {/* Categories */}
              <View style={{ marginBottom: 20, zIndex: 10 }}>
                <TouchableOpacity
                  style={styles.dropdownTrigger}
                  onPress={() => setCategoryOpen(!categoryOpen)}
                >
                  <View style={styles.selectedTagsContainer}>
                    {selectedCategories.length > 0 ? (
                      selectedCategories.map(cat => (
                        <View key={cat} style={styles.tag}>
                          <Text style={styles.tagText}>{cat}</Text>
                          <TouchableOpacity onPress={() => handleCategorySelect(cat)}>
                            <Text style={styles.tagClose}>×</Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : (
                      <Text style={{ color: "#999" }}>Select categories you wish to sell</Text>
                    )}
                  </View>
                  <ArrowDownIcon size={16} color="#999" />
                </TouchableOpacity>

                {categoryOpen && (
                  <View style={styles.dropdownContent}>
                    <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                      {CATEGORIES_LIST.map(cat => (
                        <TouchableOpacity
                          key={cat}
                          style={[styles.dropdownItem, selectedCategories.includes(cat) && styles.dropdownItemSelected]}
                          onPress={() => handleCategorySelect(cat)}
                        >
                          <Text style={selectedCategories.includes(cat) ? styles.dropdownItemTextSelected : styles.dropdownItemText}>{cat}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <View style={styles.customCategoryContainer}>
                      <Text style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>Didn't find your category?</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={styles.customCategoryInput}
                          placeholder="Type here..."
                          placeholderTextColor="#999"
                          value={customCategory}
                          onChangeText={setCustomCategory}
                        />
                        <TouchableOpacity
                          style={styles.addCategoryBtn}
                          onPress={handleCustomCategory}
                          disabled={selectedCategories.length >= 5}
                        >
                          <Text style={{ color: '#fff', fontSize: 14 }}>Add</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, (!isStep2Valid || isSubmitting) && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={!isStep2Valid || isSubmitting}
              >
                {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Sign up</Text>}
              </TouchableOpacity>
              
              <Text style={styles.termsText}>
                By signing up, you agree to our Terms and Privacy Policy.
              </Text>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Modal */}
      <Modal visible={countryOpen} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setCountryOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Select Country</Text>
              <ScrollView>
                {COUNTRIES.map(c => (
                  <TouchableOpacity
                    key={c.name}
                    style={styles.countryModalItem}
                    onPress={() => {
                      setSelectedCountry(c);
                      setCountryOpen(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{c.name} ({c.code})</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={{ marginTop: 15, padding: 10, alignItems: 'center' }} onPress={() => setCountryOpen(false)}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  backText: {
    color: ColorPalette.PURPLE_300,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  stepText: {
    fontSize: 14,
  },
  stepActive: {
    color: ColorPalette.PURPLE_300,
    fontWeight: "600",
  },
  stepInactive: {
    color: "#999",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  inputContainerRow: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  verifyRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: ColorPalette.PURPLE_300,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  verifiedBg: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#E8F5E9",
  },
  verifyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  verifiedText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  countrySelector: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 80,
    justifyContent: "space-between",
  },
  countryCode: {
    fontSize: 15,
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: -5,
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    backgroundColor: "#F9F9F9",
  },
  otpSubmitBtn: {
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  otpSubmitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: ColorPalette.PURPLE_300,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 50,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    gap: 6,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: ColorPalette.PURPLE_300,
    fontSize: 12,
    marginRight: 4,
  },
  tagClose: {
    color: ColorPalette.PURPLE_300,
    fontSize: 14,
    fontWeight: "bold",
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  dropdownItemSelected: {
    backgroundColor: "#F3E8FF",
  },
  dropdownItemText: {
    color: "#000",
  },
  dropdownItemTextSelected: {
    color: ColorPalette.PURPLE_300,
    fontWeight: "600",
  },
  customCategoryContainer: {
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  customCategoryInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  addCategoryBtn: {
    backgroundColor: ColorPalette.PURPLE_300,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    maxHeight: "60%",
  },
  countryModalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  successCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  successDesc: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
});

export default RegistrationScreen;
