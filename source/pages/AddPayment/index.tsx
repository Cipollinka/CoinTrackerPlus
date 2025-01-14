import React, {useEffect, useState} from 'react';
import {
  View,
  Switch,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Back from '@/components/Back';
import Button from '@/components/Button';
import CategoryWithInput from '@/components/CategoryWithInput';
import LabelInput from '@/components/LabelInput';
import Safe from '@/components/Safe';
import TabBar from '@/components/TabBar';
import Title from '@/components/Title';
import {NavType, Payment, PaymentType, Pages} from '@/types/all';
import {useAppStore} from '@/store/appStore';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Text from '@/components/Text';

const tabs = ['Credit', 'Installment plan', 'Payments'];

const AddPayment: React.FC = ({route}: any) => {
  const payment = route?.params?.payment as Payment | undefined;

  const nav = useNavigation<NavType>();

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [monthlySavings, setMonthlySavings] = useState<string>('');
  const [totalSavings, setTotalSavings] = useState<string>('');
  const [remaining, setRemaining] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(PaymentType.Credit);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [monthlySavingsError, setMonthlySavingsError] = useState<string | null>(
    null,
  );
  const [totalSavingsError, setTotalSavingsError] = useState<string | null>(
    null,
  );
  const [remainingError, setRemainingError] = useState<string | null>(null);

  const addPayment = useAppStore(state => state.addPayment);
  const updatePayment = useAppStore(state => state.updatePayment);
  const addCategory = useAppStore(state => state.addCategory);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  const isDisabled =
    name &&
    (category || selectedCategory) &&
    monthlySavings &&
    totalSavings &&
    remaining &&
    !(monthlySavingsError || totalSavingsError || remainingError);

  useEffect(() => {
    if (!payment) return;

    setName(payment.name);
    setCategory(payment.category);
    setSelectedCategory(payment.category);
    setMonthlySavings(payment.monthlyAmount.toString());
    setTotalSavings(payment.totalAmount.toString());
    setRemaining(payment.remaining.toString());

    payment.imageUri && setImageUri(payment.imageUri);
    payment.description && setDescription(payment.description);
  }, [payment]);

  const validateNumericInput = (
    value: string,
    setError: (error: string | null) => void,
  ) => {
    if (value && isNaN(Number(value))) {
      setError('Value must be a number');
    } else {
      setError(null);
    }
  };

  const handleSave = () => {
    if (
      category &&
      category !== selectedCategory &&
      category !== payment?.category
    ) {
      addCategory(category);
    }
    const entity = {
      name,
      category: selectedCategory || category,
      description,
      monthlyAmount: parseFloat(monthlySavings),
      totalAmount: parseFloat(totalSavings),
      remaining: parseFloat(remaining),
      imageUri,
      type: activeTab,
    };
    if (name && monthlySavings && totalSavings && remaining && !payment) {
      addPayment({
        ...entity,
        date: dayjs().toISOString(),
      });
    } else if (payment) {
      updatePayment({
        ...payment,
        ...entity,
      });
    }

    nav.navigate(Pages.Payments);
  };

  const pickImage = async () => {
    console.log('here');

    const res = await launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('response', response);

      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
    console.log('res', res);
  };

  const handleDeleteImage = () => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => setImageUri(null)},
    ]);
  };

  return (
    <Safe>
      <Back />
      <ScrollView
        style={{marginBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 12}} />
        <Title title="New payment" />
        <View style={{marginTop: 12}} />

        <LabelInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter payment name"
        />

        <CategoryWithInput
          category={category}
          selectedCategory={selectedCategory}
          setCategory={setCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <View style={{marginTop: -10}}>
          <TabBar
            tabs={tabs}
            currentTab={activeTab}
            onChangeTab={setActiveTab}
          />
        </View>

        <View style={{marginTop: 12}} />

        <LabelInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        <LabelInput
          label="Monthly amount"
          value={monthlySavings}
          onChangeText={text => {
            setMonthlySavings(text);
            validateNumericInput(text, setMonthlySavingsError);
          }}
          placeholder="Enter monthly savings"
          keyboardType="numeric"
          error={monthlySavingsError}
        />

        <LabelInput
          label="Total amount"
          value={totalSavings}
          onChangeText={text => {
            setTotalSavings(text);
            validateNumericInput(text, setTotalSavingsError);

            if (
              !isNaN(Number(text)) &&
              !isNaN(Number(remaining)) &&
              Number(remaining) > Number(text)
            ) {
              setRemainingError("Remaining can't be greater than Total amount");
            } else {
              setRemainingError(null);
            }
          }}
          placeholder="Enter total savings"
          keyboardType="numeric"
          error={totalSavingsError}
        />

        <LabelInput
          label="Remaining"
          value={remaining}
          onChangeText={text => {
            setRemaining(text);
            validateNumericInput(text, setRemainingError);

            if (
              !isNaN(Number(text)) &&
              !isNaN(Number(totalSavings)) &&
              Number(text) > Number(totalSavings)
            ) {
              setRemainingError("Remaining can't be greater than Total amount");
            } else {
              setRemainingError(null);
            }
          }}
          placeholder="Enter remaining amount"
          keyboardType="numeric"
          error={remainingError}
        />

        <Text style={styles.label}>Image</Text>
        {imageUri ? (
          <TouchableOpacity onLongPress={handleDeleteImage}>
            <Image source={{uri: imageUri}} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{false: '#767577', true: '#F5CB1C'}}
          />
        </View>
      </ScrollView>
      <Button disabled={!isDisabled} title="Next" onPress={handleSave} />
    </Safe>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    color: '#fff',
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  plusText: {
    fontSize: 24,
    color: '#888',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AddPayment;
