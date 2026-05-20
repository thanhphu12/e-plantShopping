from django.shortcuts import render, redirect
from .models import Course, Enrollment, Submission, Choice


def submit(request, course_id):
    course = Course.objects.get(pk=course_id)

    enrollment = Enrollment.objects.first()

    selected_choices = request.POST.getlist('choice')

    submission = Submission.objects.create(
        enrollment=enrollment
    )

    for choice_id in selected_choices:
        choice = Choice.objects.get(pk=choice_id)
        submission.choices.add(choice)

    return redirect(
        'show_exam_result',
        course_id=course.id
    )


def show_exam_result(request, course_id):
    course = Course.objects.get(pk=course_id)

    submission = Submission.objects.first()

    total_score = 0
    possible_score = 0

    for question in course.question_set.all():

        possible_score += question.grade

        selected_ids = []

        for choice in submission.choices.all():
            if choice.question.id == question.id:
                selected_ids.append(choice.id)

        if question.is_get_score(selected_ids):
            total_score += question.grade

    context = {
        'course': course,
        'total_score': total_score,
        'possible_score': possible_score,
    }

    return render(
        request,
        'onlinecourse/exam_result.html',
        context
    )
