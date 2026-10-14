from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model


class RegisterTests(APITestCase):
    url = "/api/register/"  # adjust to your urls.py

    def test_register_creates_voter(self):
        r = self.client.post(self.url, {
            "email": "Evan@Example.com", "name": "Evan",
            "address": "Lilongwe", "password": "S7rong!Pass_93",
        })
        self.assertEqual(r.status_code, 201)
        user = get_user_model().objects.get(email="evan@example.com")
        self.assertEqual(user.role, "VOTER")

    def test_cannot_self_assign_admin(self):
        self.client.post(self.url, {
            "email": "a@example.com", "name": "A", "address": "x",
            "password": "S7rong!Pass_93", "role": "ADMIN",
        })
        self.assertEqual(get_user_model().objects.get(email="a@example.com").role, "VOTER")

    def test_duplicate_email_case_insensitive(self):
        data = {"email": "a@example.com", "name": "A", "address": "x", "password": "S7rong!Pass_93"}
        self.client.post(self.url, data)
        data["email"] = "A@Example.com"
        self.assertEqual(self.client.post(self.url, data).status_code, 400)

    def test_weak_password_rejected(self):
        r = self.client.post(self.url, {
            "email": "b@example.com", "name": "B", "address": "x", "password": "123456",
        })
        self.assertEqual(r.status_code, 400)